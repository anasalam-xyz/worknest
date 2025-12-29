import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login, getuser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/signup', [
    body('username', 'Enter a valid username.').isLength({min:3}),
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'The password should be atleast 6 characters.').isLength({min: 6})
], signup);

router.post('/login', [
    body('email', 'Enter a valid email.').isEmail()
], login);

router.post('/profile', authMiddleware, getuser)

export default router;