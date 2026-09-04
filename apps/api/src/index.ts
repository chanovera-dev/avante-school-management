import { buildServer } from './server.js';
import { config } from './config.js';

async function main() {
  try {
    const server = await buildServer();
    await server.listen({
      port: config.port,
      host: config.host,
    });
    console.log(`🚀 ASM API Server running on http://${config.host}:${config.port}`);
    console.log(`🌐 Multi-tenant host available at http://avanteschoolmanagement.local:${config.port}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

main();
