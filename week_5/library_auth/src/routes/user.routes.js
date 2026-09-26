import express from 'express';
import {
  register,
  login,
  me,
  listUsers,
  changeRole,
} from '../controllers/user.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';

export const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', authenticate, me);

export const usersRouter = express.Router();
usersRouter.get('/', authenticate, authorize('librarian'), listUsers);
usersRouter.patch('/:id/role', authenticate, authorize('librarian'), changeRole);