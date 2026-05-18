import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET no está definido en .env');

export const config = {
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET,
};
