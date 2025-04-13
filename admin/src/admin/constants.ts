import 'dotenv/config';

export const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'password',
};