import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/book.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);

router.post('/', authenticate, authorize('librarian'), createBook);
router.put('/:id', authenticate, authorize('librarian'), updateBook);
router.delete('/:id', authenticate, authorize('librarian'), deleteBook);

export default router;