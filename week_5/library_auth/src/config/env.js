import dotenv from 'dotenv';
dotenv.config();

export const env = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 10,
};

if (!env.mongoUri) throw new Error('MONGO_URI is required');

if (!env.jwtSecret || env.jwtSecret.length < 32) {
  throw new Error('JWT_SECRET is required and must be at least 32 characters');
}