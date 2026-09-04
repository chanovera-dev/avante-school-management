import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { store } from '../store/memory.store.js';
import { authenticate } from '../middleware/auth.middleware.js';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  tenantSubdomain: z.string().optional(),
});

export async function authRoutes(fastify: FastifyInstance) {
  // Login
  fastify.post('/login', async (request, reply) => {
    const parseResult = loginSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const { email, password } = parseResult.data;
    const user = store.users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.isActive);

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

    const tenant = store.tenants.find((t) => t.id === user.tenantId);

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
      tenant: tenant || { id: user.tenantId, name: 'Plataforma Global' },
    });
  });

  // Current User (Me)
  fastify.get('/me', { preHandler: [authenticate] }, async (request, reply) => {
    const userPayload = request.userPayload!;
    const user = store.users.find((u) => u.id === userPayload.id);
    const tenant = store.tenants.find((t) => t.id === userPayload.tenantId);

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
      tenant: tenant || { id: user.tenantId, name: 'Plataforma Global' },
    });
  });

  // Demo credentials for testing
  fastify.get('/demo-accounts', async (request, reply) => {
    return reply.send({
      password: 'Admin123!',
      accounts: store.users.map((u) => ({
        role: u.role,
        email: u.email,
        name: u.fullName,
      })),
    });
  });
}
