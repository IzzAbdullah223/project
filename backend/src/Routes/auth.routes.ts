import { Router } from 'express';
import passport from 'passport';
import { signupPost, loginPost } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post('/signup', signupPost);
authRouter.post('/login', passport.authenticate('local', { session: false }), loginPost);