import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { store } from '../store/memory.store.js';
import { authenticate, requireRoles } from '../middleware/auth.middleware.js';
import { UserRole, TenantStatus, SubscriptionPlanTier, SubscriptionStatus } from '@asm/shared';

const updateStatusSchema = z.object({
  status: z.nativeEnum(TenantStatus),
});

const updatePlanSchema = z.object({
  planTier: z.nativeEnum(SubscriptionPlanTier),
  monthlyFeeMXN: z.number().nonnegative(),
});

export async function superadminRoutes(fastify: FastifyInstance) {
  // Proteger todas las rutas de SuperAdmin
  fastify.addHook('preHandler', authenticate);
  fastify.addHook('preHandler', requireRoles([UserRole.SUPER_ADMIN]));

  // 1. Padrón Maestro de Escuelas Registradas
  fastify.get('/schools', async (request, reply) => {
    const summary = store.getSuperAdminSchoolsSummary();
    return reply.send({
      totalSchools: summary.length,
      schools: summary,
    });
  });

  // 2. Cambiar Estatus de Escuela (Activar / Suspender / Archivar)
  fastify.patch('/schools/:id/status', async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = updateStatusSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const { status } = parseResult.data;
    const tenant = store.tenants.find((t) => t.id === id);

    if (!tenant) {
      return reply.status(404).send({ error: 'School Tenant Not Found' });
    }

    tenant.status = status;
    tenant.updatedAt = new Date();

    return reply.send({
      message: `Estatus de la escuela ${tenant.name} actualizado a ${status}`,
      tenant,
    });
  });

  // 3. Asignar o Cambiar Plan de Suscripción
  fastify.patch('/schools/:id/plan', async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = updatePlanSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const { planTier, monthlyFeeMXN } = parseResult.data;
    const tenant = store.tenants.find((t) => t.id === id);

    if (!tenant) {
      return reply.status(404).send({ error: 'School Tenant Not Found' });
    }

    if (!tenant.subscription) {
      tenant.subscription = {
        id: `sub-${Date.now()}`,
        tenantId: tenant.id,
        planTier,
        status: monthlyFeeMXN > 0 ? SubscriptionStatus.ACTIVE_PAID : SubscriptionStatus.FREE,
        startedAt: new Date(),
        maxStudentsLimit: planTier === SubscriptionPlanTier.STARTER ? 500 : 999999,
        monthlyFeeMXN,
        isFreeLaunchPromo: monthlyFeeMXN === 0,
      };
    } else {
      tenant.subscription.planTier = planTier;
      tenant.subscription.monthlyFeeMXN = monthlyFeeMXN;
      tenant.subscription.status = monthlyFeeMXN > 0 ? SubscriptionStatus.ACTIVE_PAID : SubscriptionStatus.FREE;
      tenant.subscription.isFreeLaunchPromo = monthlyFeeMXN === 0;
    }

    tenant.updatedAt = new Date();

    return reply.send({
      message: `Plan de suscripción de ${tenant.name} actualizado a ${planTier}`,
      subscription: tenant.subscription,
    });
  });

  // 4. Eliminar Escuela y Correos/Usuarios Registrados (Limpieza)
  fastify.delete('/schools/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const tenantIndex = store.tenants.findIndex((t) => t.id === id);

    if (tenantIndex === -1) {
      return reply.status(404).send({ error: 'School Tenant Not Found' });
    }

    const tenant = store.tenants[tenantIndex];

    // Eliminar escuela, campuses, usuarios, alumnos, cargos y tokens de verificación
    store.tenants.splice(tenantIndex, 1);
    store.users = store.users.filter((u) => u.tenantId !== id);
    store.campuses = store.campuses.filter((c) => c.tenantId !== id);
    store.students = store.students.filter((s) => s.tenantId !== id);
    store.charges = store.charges.filter((ch) => ch.tenantId !== id);
    store.payments = store.payments.filter((p) => p.tenantId !== id);
    store.verificationTokens = store.verificationTokens.filter((vt) => vt.tenantId !== id);

    return reply.send({
      message: `Escuela '${tenant.name}' y todos sus usuarios y correos registrados fueron eliminados exitosamente.`,
    });
  });

  // 5. Métricas Globales del Ecosistema SaaS
  fastify.get('/metrics', async (request, reply) => {
    const totalTenants = store.tenants.length;
    const activeTenants = store.tenants.filter((t) => t.status === TenantStatus.ACTIVO).length;
    const pendingVerification = store.tenants.filter((t) => t.status === TenantStatus.PENDIENTE_VERIFICACION).length;
    const totalStudents = store.students.length;
    const totalUsers = store.users.length;
    const totalCampuses = store.campuses.length;

    const totalProjectedMonthlyRevenue = store.tenants.reduce(
      (sum, t) => sum + (t.subscription?.monthlyFeeMXN || 0),
      0
    );

    return reply.send({
      totalTenants,
      activeTenants,
      pendingVerification,
      totalStudents,
      totalUsers,
      totalCampuses,
      totalProjectedMonthlyRevenue,
      currency: 'MXN',
    });
  });
}
