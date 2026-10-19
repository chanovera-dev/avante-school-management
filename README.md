# Avante School Management

Avante School Management (ASM) es una plataforma web para administrar instituciones educativas desde maternal hasta bachillerato. Organiza la operación escolar en una aplicación multi-tenant con módulos académicos, administrativos y financieros.

> **Estado:** proyecto en desarrollo activo. Las capacidades y el alcance pueden cambiar; consulta la documentación del proyecto y la implementación antes de usarlo en producción.

## Funcionalidades

- Administración de instituciones y campus con separación por organización.
- Ciclos escolares, niveles educativos, grupos, docentes, materias y estudiantes.
- Admisiones e inscripción de estudiantes, incluida la gestión de documentación.
- Asistencia, calificaciones, horarios, tareas y avisos escolares.
- Gestión de cargos y pagos escolares.
- Acceso a funciones de acuerdo con los roles de usuario y administración.
- Envío de correo configurable mediante SMTP.

El alcance funcional completo y el roadmap están descritos en los documentos de [`docs/`](./docs/).

## Tecnologías

- **Monorepo:** pnpm workspaces y TypeScript.
- **Frontend:** React 19 y Vite.
- **API:** Node.js, Fastify 5 y Prisma.
- **Base de datos:** PostgreSQL.
- **Validación y autenticación:** Zod y JWT.

## Estructura

```text
apps/
  api/       API Fastify, esquema Prisma y datos iniciales
  web/       Aplicación web React
packages/
  shared/    Tipos y utilidades compartidos
docs/        Alcances, capacidades y presentación del proyecto
```

## Requisitos

- Node.js 20 o posterior.
- pnpm 10.
- PostgreSQL accesible desde el entorno de desarrollo.

## Desarrollo local

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/chanovera-dev/avante-school-management.git
cd avante-school-management
pnpm install
```

Configura las variables de entorno de la API:

```bash
cp apps/api/.env.example apps/api/.env
```

Edita `apps/api/.env` y establece, como mínimo, una URL válida de PostgreSQL y un `JWT_SECRET` aleatorio. Por ejemplo, la URL tiene este formato:

```dotenv
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/asm_db?schema=public"
JWT_SECRET="reemplaza-esto-por-un-secreto-aleatorio"
```

Para generar un secreto seguro puedes usar:

```bash
openssl rand -base64 32
```

El esquema de Prisma usa PostgreSQL. Una vez creada la base de datos y configurada la conexión, prepara el cliente y sincroniza el esquema:

```bash
pnpm --filter @asm/api prisma:generate
pnpm --filter @asm/api prisma:push
```

Inicia la API y la aplicación web en modo desarrollo:

```bash
pnpm dev
```

La aplicación web estará disponible en `http://localhost:3000` y la API en `http://localhost:4000`. Vite reenvía las solicitudes `/api` a la API. El endpoint de comprobación de salud es `http://localhost:4000/health`.

Para configurar envío de correo real, completa las variables SMTP del archivo `.env`. Si no se configuran, el servicio de correo usa el flujo de vista previa de Ethereal descrito por la implementación.

## Comandos

Desde la raíz del monorepo:

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia los paquetes con un script de desarrollo en paralelo. |
| `pnpm build` | Compila los paquetes del workspace. |
| `pnpm clean` | Elimina los artefactos de compilación. |

El proyecto no define actualmente scripts raíz para `lint` o `test`.

## Seguridad y configuración

- No guardes archivos `.env`, contraseñas, tokens ni credenciales en Git.
- Cambia `JWT_SECRET` por un valor aleatorio propio; no uses secretos de ejemplo en producción.
- Configura credenciales SMTP y de base de datos mediante variables de entorno.
- Revisa y valida el despliegue, los permisos y la configuración de seguridad antes de exponer una instancia a Internet.

## Documentación

- [Alcances y capacidades](./docs/AVANTE_ALCANCES_Y_CAPACIDADES.html)
- [Presentación del proyecto](./docs/AVANTE_PRESENTACION_INVERSORES.html)
- [Alcances y capacidades (PDF)](./docs/Avante_School_Management_Alcances_y_Capacidades.pdf)
- [Presentación del proyecto (PDF)](./docs/Avante_School_Management_Presentacion_Inversores.pdf)
