import dotenv from 'dotenv';
dotenv.config();

export const env = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development'
};

if (!env.mongoUri) throw new Error('MONGO_URI is required');