import { FastifyRequest, FastifyReply } from 'fastify';
import { UserRole, UserDTO } from '@asm/shared';

declare module 'fastify' {
  interface FastifyRequest {
    userPayload?: {
      id: string;
      tenantId: string;
      role: UserRole;
      email: string;
    };
  }
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // En modo desarrollo / local, permitir fallback inteligente con el tenant detectado
      if (process.env.NODE_ENV !== 'production' && request.tenant) {
        const headerRole = (request.headers['x-user-role'] as UserRole) || UserRole.DIRECTOR;
        const headerEmail = (request.headers['x-user-email'] as string) || request.tenant.contactEmail || 'director@escuela.edu.mx';
        request.userPayload = {
          id: 'user-dev-current',
          tenantId: request.tenant.id,
          role: headerRole,
          email: headerEmail,
        };
        return;
      }

      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Token de autorización ausente o inválido',
      });
    }

    const decoded = await request.jwtVerify<{
      id: string;
      tenantId: string;
      role: UserRole;
      email: string;
    }>();

    request.userPayload = decoded;
  } catch (err) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Token expirado o inválido',
    });
  }
}

export function requireRoles(roles: UserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.userPayload) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    if (!roles.includes(request.userPayload.role)) {
      return reply.status(403).send({
        error: 'Forbidden',
        message: 'No tienes permisos suficientes para realizar esta acción',
      });
    }
  };
}
