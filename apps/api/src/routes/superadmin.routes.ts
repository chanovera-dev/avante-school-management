import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { store } from '../store/memory.store.js';
import { prisma } from '../lib/prisma.js';
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
    try {
      const dbTenants = await prisma.tenant.findMany({
        where: { id: { not: 'platform-master' } },
        include: {
          subscription: true,
          campuses: true,
          students: true,
          users: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      const schools = dbTenants.map((t) => ({
        id: t.id,
        name: t.name,
        subdomain: t.subdomain,
        contactEmail: t.contactEmail,
        contactPhone: t.contactPhone,
        status: t.status as TenantStatus,
        isEmailVerified: t.isEmailVerified,
        planTier: (t.subscription?.planTier as SubscriptionPlanTier) || SubscriptionPlanTier.FREE_TIER_LAUNCH,
        subscriptionStatus: (t.subscription?.status as SubscriptionStatus) || SubscriptionStatus.FREE,
        campusCount: t.campuses.length,
        studentCount: t.students.length,
        userCount: t.users.length,
        monthlyFeeMXN: t.subscription?.monthlyFeeMXN || 0,
        createdAt: t.createdAt,
      }));

      return reply.send({
        totalSchools: schools.length,
        schools,
      });
    } catch (err) {
      // Fallback a store en caso de error
      const summary = store.getSuperAdminSchoolsSummary().filter((s) => s.id !== 'platform-master');
      return reply.send({
        totalSchools: summary.length,
        schools: summary,
      });
    }
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

    try {
      const updatedTenant = await prisma.tenant.update({
        where: { id },
        data: { status, updatedAt: new Date() },
      });

      // Sincronizar en memoria
      const inMemoryTenant = store.tenants.find((t) => t.id === id);
      if (inMemoryTenant) {
        inMemoryTenant.status = status;
        inMemoryTenant.updatedAt = new Date();
      }

      return reply.send({
        message: `Estatus de la escuela '${updatedTenant.name}' actualizado a ${status}`,
        tenant: updatedTenant,
      });
    } catch (err) {
      return reply.status(404).send({ error: 'School Tenant Not Found' });
    }
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
    const subStatus = monthlyFeeMXN > 0 ? SubscriptionStatus.ACTIVE_PAID : SubscriptionStatus.FREE;

    try {
      const subscription = await prisma.tenantSubscription.upsert({
        where: { tenantId: id },
        create: {
          tenantId: id,
          planTier,
          monthlyFeeMXN,
          status: subStatus,
          isFreeLaunchPromo: monthlyFeeMXN === 0,
          maxStudentsLimit: planTier === SubscriptionPlanTier.STARTER ? 500 : 999999,
        },
        update: {
          planTier,
          monthlyFeeMXN,
          status: subStatus,
          isFreeLaunchPromo: monthlyFeeMXN === 0,
        },
      });

      // Sincronizar en memoria
      const inMemoryTenant = store.tenants.find((t) => t.id === id);
      if (inMemoryTenant) {
        inMemoryTenant.subscription = {
          id: subscription.id,
          tenantId: subscription.tenantId,
          planTier: subscription.planTier as any,
          status: subscription.status as any,
          startedAt: subscription.startedAt,
          maxStudentsLimit: subscription.maxStudentsLimit,
          monthlyFeeMXN: subscription.monthlyFeeMXN,
          isFreeLaunchPromo: subscription.isFreeLaunchPromo,
        };
      }

      return reply.send({
        message: `Plan de suscripción actualizado a ${planTier}`,
        subscription,
      });
    } catch (err) {
      return reply.status(404).send({ error: 'School Tenant Not Found' });
    }
  });

  // 4. Eliminar Escuela y toda su información (Cascada en PostgreSQL)
  fastify.delete('/schools/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    if (id === 'platform-master') {
      return reply.status(403).send({ error: 'No se puede eliminar la cuenta master de la plataforma.' });
    }

    try {
      // Eliminar de PostgreSQL (las relaciones con onDelete: Cascade limpian campuses, users, students, etc.)
      const deletedTenant = await prisma.tenant.delete({
        where: { id },
      });

      // Sincronizar store en memoria
      const tenantIndex = store.tenants.findIndex((t) => t.id === id);
      if (tenantIndex !== -1) {
        store.tenants.splice(tenantIndex, 1);
      }
      store.users = store.users.filter((u) => u.tenantId !== id);
      store.campuses = store.campuses.filter((c) => c.tenantId !== id);
      store.students = store.students.filter((s) => s.tenantId !== id);
      store.charges = store.charges.filter((ch) => ch.tenantId !== id);
      store.payments = store.payments.filter((p) => p.tenantId !== id);
      store.verificationTokens = store.verificationTokens.filter((vt) => vt.tenantId !== id);

      return reply.send({
        message: `Escuela '${deletedTenant.name}' y todos sus registros fueron eliminados exitosamente de la base de datos.`,
        deletedId: id,
      });
    } catch (err: any) {
      return reply.status(404).send({
        error: 'School Tenant Not Found',
        message: 'No se encontró la escuela especificada para eliminar.',
      });
    }
  });

  // 5. Métricas Globales del Ecosistema SaaS
  fastify.get('/metrics', async (request, reply) => {
    try {
      const [totalTenants, activeTenants, pendingVerification, totalStudents, totalUsers, totalCampuses, subscriptions] =
        await Promise.all([
          prisma.tenant.count({ where: { id: { not: 'platform-master' } } }),
          prisma.tenant.count({ where: { id: { not: 'platform-master' }, status: TenantStatus.ACTIVO } }),
          prisma.tenant.count({ where: { id: { not: 'platform-master' }, status: TenantStatus.PENDIENTE_VERIFICACION } }),
          prisma.student.count(),
          prisma.user.count(),
          prisma.campus.count(),
          prisma.tenantSubscription.findMany({ select: { monthlyFeeMXN: true } }),
        ]);

      const totalProjectedMonthlyRevenue = subscriptions.reduce((sum, s) => sum + (s.monthlyFeeMXN || 0), 0);

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
    } catch (err) {
      // Fallback a memoria
      const schoolTenants = store.tenants.filter((t) => t.id !== 'platform-master');
      return reply.send({
        totalTenants: schoolTenants.length,
        activeTenants: schoolTenants.filter((t) => t.status === TenantStatus.ACTIVO).length,
        pendingVerification: schoolTenants.filter((t) => t.status === TenantStatus.PENDIENTE_VERIFICACION).length,
        totalStudents: store.students.length,
        totalUsers: store.users.length,
        totalCampuses: store.campuses.length,
        totalProjectedMonthlyRevenue: schoolTenants.reduce((s, t) => s + (t.subscription?.monthlyFeeMXN || 0), 0),
        currency: 'MXN',
      });
    }
  });
}
