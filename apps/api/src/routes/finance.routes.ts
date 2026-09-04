import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { store } from '../store/memory.store.js';
import { authenticate, requireRoles } from '../middleware/auth.middleware.js';
import {
  UserRole,
  PaymentMethod,
  FundDestination,
  PaymentStatus,
  ChargeStatus,
} from '@asm/shared';

const payVentanillaSchema = z.object({
  chargeId: z.string(),
  amount: z.number().positive(),
  method: z.enum([
    PaymentMethod.EFECTIVO_VENTANILLA,
    PaymentMethod.TRANSFERENCIA_VENTANILLA_MANUAL,
    PaymentMethod.TPV_FISICA_VENTANILLA,
  ]),
  folioComprobante: z.string().optional(),
});

const payCodiSchema = z.object({
  chargeId: z.string(),
  amount: z.number().positive(),
  phoneOrAccount: z.string().optional(),
});

const syncOfflineReceiptSchema = z.object({
  offlineLocalFolio: z.string(),
  chargeId: z.string(),
  amount: z.number().positive(),
  paidAt: z.string(),
});

export async function financeRoutes(fastify: FastifyInstance) {
  // Listar Cargos del Tenant
  fastify.get('/charges', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const charges = store.charges.filter((c) => c.tenantId === tenantId);
    return reply.send({ charges });
  });

  // Resumen de Caja y Arqueo (Efectivo en Bóveda vs Bancos/CoDi/Transferencias)
  fastify.get(
    '/cash-register-summary',
    {
      preHandler: [
        authenticate,
        requireRoles([
          UserRole.SUPER_ADMIN,
          UserRole.DIRECTOR,
          UserRole.ADMIN_ESCOLAR,
          UserRole.FINANCIERO_CAJA,
        ]),
      ],
    },
    async (request, reply) => {
      const tenantId = request.userPayload!.tenantId;
      const summary = store.getCashRegisterSummary(tenantId);
      return reply.send({ summary });
    }
  );

  // Registro de Pago en Ventanilla (Efectivo o Transferencia)
  fastify.post(
    '/pay-ventanilla',
    {
      preHandler: [
        authenticate,
        requireRoles([
          UserRole.SUPER_ADMIN,
          UserRole.DIRECTOR,
          UserRole.ADMIN_ESCOLAR,
          UserRole.FINANCIERO_CAJA,
        ]),
      ],
    },
    async (request, reply) => {
      const parseResult = payVentanillaSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: 'Validation Error',
          details: parseResult.error.flatten(),
        });
      }

      const { chargeId, amount, method, folioComprobante } = parseResult.data;
      const tenantId = request.userPayload!.tenantId;

      const charge = store.charges.find((c) => c.id === chargeId && c.tenantId === tenantId);
      if (!charge) {
        return reply.status(404).send({ error: 'Cargo no encontrado' });
      }

      // Validar monto contra saldo insoluto
      if (amount > charge.outstandingBalance) {
        return reply.status(400).send({
          error: 'Amount Exceeded',
          message: `El importe ($${amount}) excede el saldo insoluto pendiente ($${charge.outstandingBalance})`,
        });
      }

      // Actualizar Cargo
      charge.paidAmount += amount;
      charge.outstandingBalance -= amount;

      if (charge.outstandingBalance <= 0) {
        charge.status = ChargeStatus.LIQUIDADO;
      } else {
        charge.status = ChargeStatus.ABONADO_PARCIAL;
      }
      charge.updatedAt = new Date();

      // Clasificación estricta de destino de fondos
      const fundDestination =
        method === PaymentMethod.EFECTIVO_VENTANILLA
          ? FundDestination.EFECTIVO_BOVEDA_CAJA
          : FundDestination.CUENTA_BANCARIA;

      const payment = {
        id: `pay-${Date.now()}`,
        tenantId,
        chargeId: charge.id,
        studentId: charge.studentId,
        amount,
        method,
        fundDestination,
        status: PaymentStatus.APROBADO_CONFIRMADO,
        authorizationFolio: folioComprobante || `REC-${Date.now().toString().slice(-6)}`,
        isOfflineProvisional: false,
        paidAt: new Date(),
      };

      store.payments.push(payment);

      return reply.status(201).send({
        payment,
        updatedCharge: charge,
      });
    }
  );

  // Pago Digital CoDi (Banco de México - 0% Comisión)
  fastify.post('/pay-codi', { preHandler: [authenticate] }, async (request, reply) => {
    const parseResult = payCodiSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const { chargeId, amount } = parseResult.data;
    const tenantId = request.userPayload!.tenantId;

    const charge = store.charges.find((c) => c.id === chargeId && c.tenantId === tenantId);
    if (!charge) {
      return reply.status(404).send({ error: 'Cargo no encontrado' });
    }

    // Actualizar Cargo
    charge.paidAmount += amount;
    charge.outstandingBalance -= amount;
    charge.status = charge.outstandingBalance <= 0 ? ChargeStatus.LIQUIDADO : ChargeStatus.ABONADO_PARCIAL;
    charge.updatedAt = new Date();

    const payment = {
      id: `pay-codi-${Date.now()}`,
      tenantId,
      chargeId: charge.id,
      studentId: charge.studentId,
      amount,
      method: PaymentMethod.CODI_BANXICO,
      fundDestination: FundDestination.CUENTA_BANCARIA,
      status: PaymentStatus.APROBADO_CONFIRMADO,
      authorizationFolio: `CODI-BANXICO-${Date.now().toString().slice(-7)}`,
      isOfflineProvisional: false,
      paidAt: new Date(),
    };

    store.payments.push(payment);

    return reply.status(201).send({
      message: 'Pago CoDi procesado con 0% de comisión vía SPEI',
      payment,
      updatedCharge: charge,
    });
  });

  // Reconciliación de Recibos Provisionales Offline (Ventanilla)
  fastify.post(
    '/sync-offline-receipt',
    {
      preHandler: [
        authenticate,
        requireRoles([
          UserRole.SUPER_ADMIN,
          UserRole.DIRECTOR,
          UserRole.ADMIN_ESCOLAR,
          UserRole.FINANCIERO_CAJA,
        ]),
      ],
    },
    async (request, reply) => {
      const parseResult = syncOfflineReceiptSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: 'Validation Error',
          details: parseResult.error.flatten(),
        });
      }

      const { offlineLocalFolio, chargeId, amount, paidAt } = parseResult.data;
      const tenantId = request.userPayload!.tenantId;

      const charge = store.charges.find((c) => c.id === chargeId && c.tenantId === tenantId);
      if (!charge) {
        return reply.status(404).send({ error: 'Cargo no encontrado para reconciliación' });
      }

      charge.paidAmount += amount;
      charge.outstandingBalance = Math.max(0, charge.outstandingBalance - amount);
      charge.status = charge.outstandingBalance <= 0 ? ChargeStatus.LIQUIDADO : ChargeStatus.ABONADO_PARCIAL;
      charge.updatedAt = new Date();

      const syncedPayment = {
        id: `pay-synced-${Date.now()}`,
        tenantId,
        chargeId: charge.id,
        studentId: charge.studentId,
        amount,
        method: PaymentMethod.EFECTIVO_VENTANILLA,
        fundDestination: FundDestination.EFECTIVO_BOVEDA_CAJA,
        status: PaymentStatus.APROBADO_CONFIRMADO,
        authorizationFolio: `DEF-REC-${offlineLocalFolio}`,
        isOfflineProvisional: true,
        offlineLocalFolio,
        paidAt: new Date(paidAt),
        syncedAt: new Date(),
      };

      store.payments.push(syncedPayment);

      return reply.status(200).send({
        message: 'Recibo provisional offline reconciliado exitosamente',
        payment: syncedPayment,
        updatedCharge: charge,
      });
    }
  );
}
