import Router from 'express';
import { loginUser, registerUser } from '../controllers/AuthController';

const authRouter = Router();

authRouter.post('/auth/registerUser', registerUser);
authRouter.post('/auth/loginUser', loginUser);

export default authRouter;