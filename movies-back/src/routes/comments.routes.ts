import {Request, Response, Router} from 'express';
import commentsController from '../controllers/comments.controller';
import {TokenValidation} from '../libs/verifyToken';

class CommentsRoutes {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', commentsController.getComments);
        this.router.get('/:id', commentsController.getComment);
        this.router.post('/', commentsController.createComment);
        this.router.put('/:id', commentsController.updateComment);
        this.router.delete('/:id', TokenValidation, commentsController.deleteComment);
    }

   
}

const commentsRoutes = new CommentsRoutes();

export default commentsRoutes.router;