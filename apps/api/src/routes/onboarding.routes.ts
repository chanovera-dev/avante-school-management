import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { store } from '../store/memory.store.js';
import { prisma } from '../lib/prisma.js';
import { emailService } from '../services/email.service.js';
import {
  UserRole,
  TenantStatus,
  SubscriptionPlanTier,
  SubscriptionStatus,
  GatewayFeePolicy,
  EducationLevel,
} from '@asm/shared';

const registerSchoolSchema = z.object({
  schoolName: z.string().min(3),
  subdomain: z.string().min(3).regex(/^[a-z0-9-]+$/),
  adminFullName: z.string().min(3),
  adminEmail: z.string().email(),
  adminPassword: z.string().min(6),
  adminPhone: z.string().min(8),
  levelsOffered: z.array(z.string()).optional().default([]),
});

const LEVEL_METADATA_MAP: Record<string, { name: string; cctCode: string; evaluationScale: string; grades: string[] }> = {
  GUARDERIA: {
    name: 'Guardería / Maternal',
    cctCode: '30PDI0001X',
    evaluationScale: 'CUALITATIVA',
    grades: ['Lactantes', 'Maternal A', 'Maternal B'],
  },
  PREESCOLAR: {
    name: 'Preescolar / Jardín de Niños',
    cctCode: '30PJN0145X',
    evaluationScale: 'CUALITATIVA',
    grades: ['1º Kínder', '2º Kínder', '3º Kínder'],
  },
  KINDER_PREESCOLAR: {
    name: 'Preescolar / Jardín de Niños',
    cctCode: '30PJN0145X',
    evaluationScale: 'CUALITATIVA',
    grades: ['1º Kínder', '2º Kínder', '3º Kínder'],
  },
  PRIMARIA: {
    name: 'Primaria',
    cctCode: '30PPR0289Z',
    evaluationScale: 'NUMERICA_SEP_DECIMAL',
    grades: ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'],
  },
  SECUNDARIA: {
    name: 'Secundaria',
    cctCode: '30PES0100Y',
    evaluationScale: 'NUMERICA_SEP_DECIMAL',
    grades: ['1º Secundaria', '2º Secundaria', '3º Secundaria'],
  },
  PREPARATORIA: {
    name: 'Preparatoria / Bachillerato',
    cctCode: '30PBH0050W',
    evaluationScale: 'NUMERICA_SEP_DECIMAL',
    grades: ['1º Semestre', '2º Semestre', '3º Semestre', '4º Semestre', '5º Semestre', '6º Semestre'],
  },
};

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

    const { schoolName, subdomain, adminFullName, adminEmail, adminPassword, adminPhone, levelsOffered } =
      parseResult.data;

    // Validar subdominio único en DB o memoria
    const dbSubdomain = await prisma.tenant.findUnique({
      where: { subdomain: subdomain.toLowerCase() },
    });
    const memSubdomain = store.tenants.find(
      (t) => t.subdomain.toLowerCase() === subdomain.toLowerCase()
    );

    if (dbSubdomain || memSubdomain) {
      return reply.status(409).send({
        error: 'Subdomain In Use',
        message: `El subdominio '${subdomain}' ya está en uso. Por favor elige otro diferente.`,
      });
    }

    // Validar correo único
    const dbUser = await prisma.user.findFirst({
      where: { email: { equals: adminEmail, mode: 'insensitive' } },
    });
    const memUser = store.users.find(
      (u) => u.email.toLowerCase() === adminEmail.toLowerCase()
    );

    if (dbUser || memUser) {
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
    const passwordHash = bcrypt.hashSync(adminPassword, 10);
    const offered = levelsOffered || [];

    // Guardar en PostgreSQL
    try {
      await prisma.tenant.create({
        data: {
          id: tenantId,
          name: schoolName,
          subdomain: subdomain.toLowerCase(),
          legalBusinessName: schoolName,
          contactEmail: adminEmail,
          contactPhone: adminPhone,
          timeZone: 'America/Mexico_City',
          currency: 'MXN',
          gatewayFeePolicy: 'TRANSFERRED_TO_TUTOR',
          whatsappEnabled: true,
          status: 'PENDIENTE_VERIFICACION',
          isEmailVerified: false,
          subscription: {
            create: {
              id: `sub-${Date.now()}`,
              planTier: 'FREE_TIER_LAUNCH',
              status: 'FREE',
              maxStudentsLimit: 999999,
              monthlyFeeMXN: 0,
              isFreeLaunchPromo: true,
            },
          },
          campuses: {
            create: {
              id: campusId,
              name: 'Campus Principal',
              code: 'CAMPUS-01',
              address: 'Dirección Principal del Colegio',
              phone: adminPhone,
              levelsOffered: offered,
              isActive: true,
            },
          },
          users: {
            create: {
              id: userId,
              campusId,
              email: adminEmail,
              fullName: adminFullName,
              role: 'DIRECTOR',
              phone: adminPhone,
              isEmailVerified: false,
              isActive: true,
              passwordHash,
            },
          },
          verificationTokens: {
            create: {
              email: adminEmail.toLowerCase(),
              code: otpCode,
              userId,
              expiresAt,
            },
          },
        },
      });

      // Crear niveles educativos correspondientes en BD
      for (const lvl of offered) {
        const info = LEVEL_METADATA_MAP[lvl] || {
          name: lvl,
          cctCode: '30PPR0000X',
          evaluationScale: 'NUMERICA_SEP_DECIMAL',
          grades: [],
        };
        const normId = lvl === 'KINDER_PREESCOLAR' ? 'PREESCOLAR' : lvl;
        await prisma.educationalLevel.create({
          data: {
            id: `lvl-${normId.toLowerCase()}-${Date.now()}`,
            tenantId,
            level: normId,
            name: info.name,
            code: normId,
            evaluationScale: info.evaluationScale,
          },
        });
      }
    } catch (dbErr) {
      console.error('Error al persistir escuela en PostgreSQL:', dbErr);
    }

    // Sincronizar en memoria
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

    const newCampus = {
      id: campusId,
      tenantId,
      name: 'Campus Principal',
      code: 'CAMPUS-01',
      address: 'Dirección Principal del Colegio',
      phone: adminPhone,
      levelsOffered: offered as EducationLevel[],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

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

    // Guardar niveles en memoria para este nuevo colegio (limpios, sin directores precargados)
    for (const lvl of offered) {
      const info = LEVEL_METADATA_MAP[lvl] || {
        name: lvl,
        cctCode: '30PPR0000X',
        evaluationScale: 'NUMERICA_SEP_DECIMAL',
        grades: [],
      };
      const normId = lvl === 'KINDER_PREESCOLAR' ? 'PREESCOLAR' : lvl;
      store.educationalLevels.push({
        id: normId,
        tenantId,
        name: info.name,
        cctCode: info.cctCode,
        grades: info.grades,
        isEmailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return reply.status(201).send({
      message: 'Escuela registrada exitosamente. Código de verificación generado.',
      tenantId: newTenant.id,
      subdomain: newTenant.subdomain,
      email: adminEmail,
      levelsOffered: offered,
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

    // Buscar token en DB o memoria
    let tokenEntry = store.verificationTokens.find(
      (t) => t.email.toLowerCase() === email.toLowerCase() && t.code === code
    );

    if (!tokenEntry) {
      const dbToken = await prisma.emailVerificationToken.findFirst({
        where: { email: email.toLowerCase(), code },
      });
      if (dbToken) {
        tokenEntry = {
          email: dbToken.email,
          code: dbToken.code,
          tenantId: dbToken.tenantId,
          userId: dbToken.userId,
          expiresAt: dbToken.expiresAt,
        };
      }
    }

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

    // Activar en PostgreSQL
    try {
      await prisma.tenant.update({
        where: { id: tokenEntry.tenantId },
        data: { status: 'ACTIVO', isEmailVerified: true },
      });
      await prisma.user.update({
        where: { id: tokenEntry.userId },
        data: { isEmailVerified: true },
      });
      await prisma.emailVerificationToken.deleteMany({
        where: { email: email.toLowerCase() },
      });
    } catch (err) {
      console.warn('Error al activar en PostgreSQL:', err);
    }

    // Activar en memoria
    const tenant = store.tenants.find((t) => t.id === tokenEntry!.tenantId);
    const user = store.users.find((u) => u.id === tokenEntry!.userId);

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
      id: user?.id || tokenEntry.userId,
      tenantId: tenant?.id || tokenEntry.tenantId,
      role: user?.role || UserRole.DIRECTOR,
      email: user?.email || email,
    });

    return reply.send({
      message: '¡Correo verificado con éxito! Bienvenido a Avante School Management.',
      token,
      user: {
        id: user?.id || tokenEntry.userId,
        email: user?.email || email,
        fullName: user?.fullName || 'Director General',
        role: user?.role || UserRole.DIRECTOR,
        tenantId: tenant?.id || tokenEntry.tenantId,
      },
      tenant: {
        id: tenant?.id || tokenEntry.tenantId,
        name: tenant?.name || 'Tu Escuela',
        subdomain: tenant?.subdomain,
        plan: tenant?.subscription?.planTier,
        status: tenant?.status || TenantStatus.ACTIVO,
        levelsOffered: store.campuses.find((c) => c.tenantId === (tenant?.id || tokenEntry.tenantId))?.levelsOffered || [],
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

    // Actualizar en DB
    try {
      await prisma.emailVerificationToken.deleteMany({ where: { email: email.toLowerCase() } });
      await prisma.emailVerificationToken.create({
        data: {
          email: email.toLowerCase(),
          code: newCode,
          tenantId: user.tenantId,
          userId: user.id,
          expiresAt,
        },
      });
    } catch (err) {
      console.warn('Error al actualizar token en PostgreSQL:', err);
    }

    // Actualizar en memoria
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
