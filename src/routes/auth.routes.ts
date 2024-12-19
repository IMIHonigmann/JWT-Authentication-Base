import { Router, Application } from 'express';
import AuthController from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

export function setAuthRoutes(app: Application) {
    app.post('/register', authController.register.bind(authController));
    app.post('/login', authController.login.bind(authController));

    // Protected route
    app.get('/profile', authenticateJWT, (req, res) => {
        // @ts-ignore
        res.json({ message: 'Protected route accessed successfully', user: req.user });
    });
}

export default router;