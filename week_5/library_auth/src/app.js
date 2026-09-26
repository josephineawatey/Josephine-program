import express from 'express';
import bookRoutes from './routes/book.routes.js';
import { authRouter, usersRouter } from './routes/user.routes.js';
import notFound from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

// Required: liveness + mongo state
app.get('/health', (req, res) => {
  const state = mongoose.connection.readyState; // 1 = connected
  if (state === 1) {
    return res.status(200).json({ status: 'ok', db: 'connected' });
  }
  return res.status(503).json({ status: 'error', db: 'disconnected' });
});

app.get('/', (req, res) => res.json({ message: 'Library API running' }));

// Feature routes under /api
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// 404 for unmatched routes - must be after all routes
app.use(notFound);

// Single exit point for every error - must be last
app.use(errorHandler);

export default app;