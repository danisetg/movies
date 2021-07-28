import {Request, Response, Router} from 'express';
import MoviesController from '../controllers/movies.controller';
import {TokenValidation} from '../libs/verifyToken';

class MoviesRoutes {
    router: Router;
    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', MoviesController.getMovies);
        this.router.get('/:id', MoviesController.getMovie);
        this.router.post('/', TokenValidation, MoviesController.createMovie);
        this.router.put('/:id', TokenValidation, MoviesController.updateMovie);        
        this.router.delete('/:id', TokenValidation, MoviesController.deleteMovie);
    }
   
}

const moviesRoutes = new MoviesRoutes();

export default moviesRoutes.router;