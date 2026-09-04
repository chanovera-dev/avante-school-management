import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate } from '../middleware/auth.middleware.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  tenantSubdomain: z.string().optional(),
});

export async function authRoutes(fastify: FastifyInstance) {
  // Login directo contra PostgreSQL vía Prisma
  fastify.post('/login', async (request, reply) => {
    const parseResult = loginSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const { email, password } = parseResult.data;
    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        isActive: true,
      },
      include: {
        tenant: true,
      },
    });

    if (!user) {
      return reply.status(401).send({
        error: 'Invalid Credentials',
        message: 'Correo electrónico o contraseña incorrectos',
      });
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return reply.status(401).send({
        error: 'Invalid Credentials',
        message: 'Correo electrónico o contraseña incorrectos',
      });
    }

    const token = fastify.jwt.sign({
      id: user.id,
      tenantId: user.tenantId,
      role: user.role,
      email: user.email,
    });

    return reply.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        tenantId: user.tenantId,
        campusId: user.campusId,
      },
      tenant: user.tenant || { id: user.tenantId, name: 'Plataforma Global' },
    });
  });

  // Current User (Me) directo contra PostgreSQL
  fastify.get('/me', { preHandler: [authenticate] }, async (request, reply) => {
    const userPayload = request.userPayload!;
    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
      include: {
        tenant: true,
      },
    });

    if (!user) {
      return reply.status(404).send({ error: 'User Not Found' });
    }

    return reply.send({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        tenantId: user.tenantId,
        campusId: user.campusId,
      },
      tenant: user.tenant || { id: user.tenantId, name: 'Plataforma Global' },
    });
  });
}
