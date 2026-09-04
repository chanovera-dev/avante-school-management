import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { config } from './config.js';
import { tenantMiddleware } from './middleware/tenant.middleware.js';
import { authRoutes } from './routes/auth.routes.js';
import { onboardingRoutes } from './routes/onboarding.routes.js';
import { superadminRoutes } from './routes/superadmin.routes.js';
import { tenantRoutes } from './routes/tenant.routes.js';
import { academicRoutes } from './routes/academic.routes.js';
import { financeRoutes } from './routes/finance.routes.js';

export async function buildServer() {
  const fastify = Fastify({
    logger: true,
  });

  // CORS
  await fastify.register(cors, {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // JWT
  await fastify.register(jwt, {
    secret: config.jwtSecret,
  });

  // Tenant Resolution Hook
  fastify.addHook('onRequest', tenantMiddleware);

  // Health Check
  fastify.get('/health', async () => {
    return {
      status: 'ok',
      service: 'Avante School Management API (ASM)',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
    };
  });

  // Registrar Rutas
  await fastify.register(authRoutes, { prefix: '/api/auth' });
  await fastify.register(onboardingRoutes, { prefix: '/api/onboarding' });
  await fastify.register(superadminRoutes, { prefix: '/api/superadmin' });
  await fastify.register(tenantRoutes, { prefix: '/api/tenants' });
  await fastify.register(academicRoutes, { prefix: '/api/academic' });
  await fastify.register(financeRoutes, { prefix: '/api/finance' });

  return fastify;
}
