import { FastifyRequest, FastifyReply } from 'fastify';
import { store } from '../store/memory.store.js';
import { TenantDTO, TenantStatus } from '@asm/shared';

declare module 'fastify' {
  interface FastifyRequest {
    tenant?: TenantDTO;
  }
}

export async function tenantMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const host = request.headers.host || '';
  const headerTenantId = request.headers['x-tenant-id'] as string;
  const headerTenantSubdomain = request.headers['x-tenant-subdomain'] as string;

  let tenant: TenantDTO | undefined;

  // 1. Resolver por Header directo
  if (headerTenantId) {
    tenant = store.tenants.find((t) => t.id === headerTenantId && t.status === TenantStatus.ACTIVO);
  } else if (headerTenantSubdomain) {
    tenant = store.tenants.find(
      (t) => t.subdomain.toLowerCase() === headerTenantSubdomain.toLowerCase() && t.status === TenantStatus.ACTIVO
    );
  }

  // 2. Resolver por Subdominio en Host (ej. logos.localhost o hidalgo.avanteschoolmanagement.local)
  if (!tenant && host) {
    const cleanHost = host.split(':')[0]; // Quitar puerto si existe
    const parts = cleanHost.split('.');

    const isSub =
      (parts.length === 2 && parts[1] === 'localhost' && parts[0] !== 'admin' && parts[0] !== 'api' && parts[0] !== 'app' && parts[0] !== 'www') ||
      (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'app' && parts[0] !== 'admin');

    if (isSub) {
      const subdomain = parts[0].toLowerCase();
      tenant = store.tenants.find(
        (t) => t.subdomain.toLowerCase() === subdomain && t.status === TenantStatus.ACTIVO
      );
      // Si se invocó explícitamente un subdominio y no existe en la base de datos, no asignar tenant arbitrario
      if (!tenant) {
        request.tenant = undefined;
        return;
      }
    }
  }

  // Si es localhost puro o 127.0.0.1 sin subdominio
  if (!tenant && host) {
    const cleanHost = host.split(':')[0];
    if (cleanHost === 'localhost' || cleanHost === '127.0.0.1') {
      tenant = store.tenants[0];
    }
  }

  request.tenant = tenant;
}
