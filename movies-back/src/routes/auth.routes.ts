import {Request, Response, Router} from 'express';
import authController from '../controllers/auth.controller';

class AuthRoutes {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/signin', authController.signin);
        this.router.post('/signup', authController.signup);
    }
}

const authRoutes = new AuthRoutes();

export default authRoutes.router;