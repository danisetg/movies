import {Request, Response, Router} from 'express';
import usersController from '../controllers/users.controller';

class UsersRoutes {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }


    routes() {
        this.router.get('/', usersController.getUsers);
        this.router.get('/:id', usersController.getUser);
        this.router.post('/', usersController.createUser);
        this.router.put('/:id', usersController.updateUser);
        this.router.delete('/:id', usersController.deleteUser);
    }

   
}

const usersRoutes = new UsersRoutes();

export default usersRoutes.router;