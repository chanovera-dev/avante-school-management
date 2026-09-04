import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { store } from '../store/memory.store.js';
import { emailService } from '../services/email.service.js';
import {
  UserRole,
  TenantStatus,
  SubscriptionPlanTier,
  SubscriptionStatus,
  GatewayFeePolicy,
} from '@asm/shared';

const registerSchoolSchema = z.object({
  schoolName: z.string().min(3),
  subdomain: z.string().min(3).regex(/^[a-z0-9-]+$/),
  adminFullName: z.string().min(3),
  adminEmail: z.string().email(),
  adminPassword: z.string().min(6),
  adminPhone: z.string().min(8),
});

const verifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

const resendCodeSchema = z.object({
  email: z.string().email(),
});

export async function onboardingRoutes(fastify: FastifyInstance) {
  // 1. Registro de Escuela y Director
  fastify.post('/register-school', async (request, reply) => {
    const parseResult = registerSchoolSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const { schoolName, subdomain, adminFullName, adminEmail, adminPassword, adminPhone } =
      parseResult.data;

    // Validar subdominio único
    const existingSubdomain = store.tenants.find(
      (t) => t.subdomain.toLowerCase() === subdomain.toLowerCase()
    );
    if (existingSubdomain) {
      return reply.status(409).send({
        error: 'Subdomain In Use',
        message: `El subdominio '${subdomain}' ya está en uso. Por favor elige otro diferente.`,
      });
    }

    // Validar correo único
    const existingUser = store.users.find(
      (u) => u.email.toLowerCase() === adminEmail.toLowerCase()
    );
    if (existingUser) {
      return reply.status(409).send({
        error: 'Email In Use',
        message: `El correo electrónico '${adminEmail}' ya está registrado.`,
      });
    }

    // Generar Código OTP de 6 dígitos
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    // Enviar correo (o registrar en consola local en modo desarrollo)
    const emailResult = await emailService.sendVerificationEmail(adminEmail, otpCode, schoolName);

    const tenantId = `tenant-${Date.now()}`;
    const userId = `user-director-${Date.now()}`;
    const campusId = `campus-${Date.now()}`;

    // Crear Tenant en estado PENDIENTE_VERIFICACION
    const newTenant = {
      id: tenantId,
      name: schoolName,
      subdomain: subdomain.toLowerCase(),
      legalBusinessName: schoolName,
      contactEmail: adminEmail,
      contactPhone: adminPhone,
      timeZone: 'America/Mexico_City',
      currency: 'MXN',
      gatewayFeePolicy: GatewayFeePolicy.TRANSFERRED_TO_TUTOR,
      whatsappEnabled: true,
      status: TenantStatus.PENDIENTE_VERIFICACION,
      isEmailVerified: false,
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

    // Crear Campus Principal
    const newCampus = {
      id: campusId,
      tenantId,
      name: 'Campus Principal',
      code: 'CAMPUS-01',
      address: 'Dirección Principal del Colegio',
      phone: adminPhone,
      levelsOffered: [],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Crear Usuario Director
    const passwordHash = bcrypt.hashSync(adminPassword, 10);
    const newUser = {
      id: userId,
      tenantId,
      campusId,
      email: adminEmail,
      fullName: adminFullName,
      role: UserRole.DIRECTOR,
      phone: adminPhone,
      isEmailVerified: false,
      isActive: true,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    store.tenants.push(newTenant);
    store.campuses.push(newCampus);
    store.users.push(newUser);
    store.verificationTokens.push({
      email: adminEmail.toLowerCase(),
      code: otpCode,
      tenantId,
      userId,
      expiresAt,
    });

    return reply.status(201).send({
      message: 'Escuela registrada exitosamente. Código de verificación generado.',
      tenantId: newTenant.id,
      subdomain: newTenant.subdomain,
      email: adminEmail,
      devOtpCode: emailResult.devMode ? otpCode : undefined,
    });
  });

  // 2. Verificación de Correo Electrónico con Código OTP
  fastify.post('/verify-email', async (request, reply) => {
    const parseResult = verifyEmailSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const { email, code } = parseResult.data;

    const tokenEntry = store.verificationTokens.find(
      (t) => t.email.toLowerCase() === email.toLowerCase() && t.code === code
    );

    if (!tokenEntry) {
      return reply.status(400).send({
        error: 'Invalid Code',
        message: 'El código de verificación ingresado es incorrecto.',
      });
    }

    if (new Date() > tokenEntry.expiresAt) {
      return reply.status(400).send({
        error: 'Expired Code',
        message: 'El código de verificación ha expirado. Por favor solicita uno nuevo.',
      });
    }

    // Activar Tenant y Usuario en la base de datos
    const tenant = store.tenants.find((t) => t.id === tokenEntry.tenantId);
    const user = store.users.find((u) => u.id === tokenEntry.userId);

    if (tenant) {
      tenant.status = TenantStatus.ACTIVO;
      tenant.isEmailVerified = true;
      tenant.updatedAt = new Date();
    }

    if (user) {
      user.isEmailVerified = true;
      user.updatedAt = new Date();
    }

    // Eliminar token usado
    store.verificationTokens = store.verificationTokens.filter(
      (t) => t.email.toLowerCase() !== email.toLowerCase()
    );

    // Generar Token JWT de sesión
    const token = fastify.jwt.sign({
      id: user!.id,
      tenantId: tenant!.id,
      role: user!.role,
      email: user!.email,
    });

    return reply.send({
      message: '¡Correo verificado con éxito! Bienvenido a Avante School Management.',
      token,
      user: {
        id: user!.id,
        email: user!.email,
        fullName: user!.fullName,
        role: user!.role,
        tenantId: tenant!.id,
      },
      tenant: {
        id: tenant!.id,
        name: tenant!.name,
        subdomain: tenant!.subdomain,
        plan: tenant!.subscription?.planTier,
        status: tenant!.status,
      },
    });
  });

  // 3. Reenvío de Código de Verificación
  fastify.post('/resend-code', async (request, reply) => {
    const parseResult = resendCodeSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: 'Validation Error' });
    }

    const { email } = parseResult.data;
    const user = store.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return reply.status(404).send({ error: 'User Not Found' });
    }

    const tenant = store.tenants.find((t) => t.id === user.tenantId);
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const emailResult = await emailService.sendVerificationEmail(email, newCode, tenant?.name || 'Tu Escuela');

    const existing = store.verificationTokens.find((t) => t.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      existing.code = newCode;
      existing.expiresAt = expiresAt;
    } else {
      store.verificationTokens.push({
        email: email.toLowerCase(),
        code: newCode,
        tenantId: user.tenantId,
        userId: user.id,
        expiresAt,
      });
    }

    return reply.send({
      message: 'Nuevo código de verificación generado.',
      devOtpCode: emailResult.devMode ? newCode : undefined,
    });
  });
}
