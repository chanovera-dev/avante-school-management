import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  host: process.env.HOST || '0.0.0.0',
  jwtSecret: process.env.JWT_SECRET || 'asm-super-secure-secret-key-2026',
  corsOrigins: [
    'http://localhost:3000',
    'http://avanteschoolmanagement.local:3000',
    'http://app.avanteschoolmanagement.local:3000',
    'http://admin.avanteschoolmanagement.local:3000',
    /^http:\/\/.*\.avanteschoolmanagement\.local:3000$/,
  ],
};
