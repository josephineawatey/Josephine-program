import { Router } from 'express';
import bookRoutes from './book.routes.js';

const router = Router();

// All book routes will be under /api/books
router.use('/books', bookRoutes);

export default router;