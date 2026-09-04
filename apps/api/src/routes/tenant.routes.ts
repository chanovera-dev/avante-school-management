import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { store } from '../store/memory.store.js';
import { authenticate, requireRoles } from '../middleware/auth.middleware.js';
import { UserRole, GatewayFeePolicy, TenantStatus, SubscriptionPlanTier, SubscriptionStatus } from '@asm/shared';

const createTenantSchema = z.object({
  name: z.string().min(3),
  subdomain: z.string().min(3).regex(/^[a-z0-9-]+$/),
  legalBusinessName: z.string().min(3),
  rfc: z.string().optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(8),
  gatewayFeePolicy: z.nativeEnum(GatewayFeePolicy).default(GatewayFeePolicy.TRANSFERRED_TO_TUTOR),
  whatsappEnabled: z.boolean().default(true),
});

export async function tenantRoutes(fastify: FastifyInstance) {
  // Obtener información del tenant actual
  fastify.get('/current', async (request, reply) => {
    const tenant = request.tenant;
    if (!tenant) {
      return reply.status(404).send({ error: 'Tenant no encontrado' });
    }

    const campuses = store.campuses.filter((c) => c.tenantId === tenant.id);
    return reply.send({
      tenant,
      campuses,
    });
  });

  // Listar todos los tenants (Solo SuperAdmin)
  fastify.get(
    '/',
    { preHandler: [authenticate, requireRoles([UserRole.SUPER_ADMIN])] },
    async (request, reply) => {
      return reply.send({
        tenants: store.tenants,
      });
    }
  );

  // Crear nuevo tenant (Solo SuperAdmin)
  fastify.post(
    '/',
    { preHandler: [authenticate, requireRoles([UserRole.SUPER_ADMIN])] },
    async (request, reply) => {
      const parseResult = createTenantSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: 'Validation Error',
          details: parseResult.error.flatten(),
        });
      }

      const data = parseResult.data;
      const existing = store.tenants.find(
        (t) => t.subdomain.toLowerCase() === data.subdomain.toLowerCase()
      );
      if (existing) {
        return reply.status(409).send({
          error: 'Subdomain already in use',
          message: `El subdominio ${data.subdomain} ya está registrado`,
        });
      }

      const tenantId = `tenant-${Date.now()}`;
      const newTenant = {
        id: tenantId,
        name: data.name,
        subdomain: data.subdomain.toLowerCase(),
        legalBusinessName: data.legalBusinessName,
        rfc: data.rfc,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        timeZone: 'America/Mexico_City',
        currency: 'MXN',
        gatewayFeePolicy: data.gatewayFeePolicy,
        whatsappEnabled: data.whatsappEnabled,
        status: TenantStatus.ACTIVO,
        isEmailVerified: true,
        subscription: {
          id: `sub-${Date.now()}`,
          tenantId,
          planTier: SubscriptionPlanTier.FREE_TIER_LAUNCH,
          status: SubscriptionStatus.FREE,
          startedAt: new Date(),
          maxStudentsLimit: 999999,
          monthlyFeeMXN: 0,
          isFreeLaunchPromo: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      store.tenants.push(newTenant);
      return reply.status(201).send({ tenant: newTenant });
    }
  );
}
