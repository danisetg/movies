import {Request, Response, Router} from 'express';
import Movie, { IMovie } from '../models/movie.model';

class MoviesController {

    
    constructor() {
    }

    async getMovies(req: Request, res: Response) {
        let q = '';
        if(req.query.q)
            q = req.query.q.toString();
        try {
            const movies = await Movie.find({$or: [{film: new RegExp(q, 'i')}, {genre: new RegExp(q, 'i')}]})
            .limit(Number(req.query.limit)).skip(Number(req.query.limit)*Number(req.query.page));
            res.json(movies);
        } catch (err) {
            res.json(err);
        }
        
    }

    async getMovie(req: Request, res: Response) {
        const movie = await Movie.findById(req.params.id);
        res.json(movie);
    }

   
    async createMovie(req: Request, res: Response){
        const movieExist = await Movie.findOne({film: req.body.film});
        if(movieExist)
            return res.status(400).json({message: "Movie already exists"});
        const movie: IMovie = new Movie(req.body);

        await movie.save();
        res.json({message: "Movie created", data: movie});
    }

    async deleteMovie(req: Request, res: Response) {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({mesage: "movie deleted"});
    }

    async updateMovie(req: Request, res: Response) {
        const movie = await Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.json({message: "movie updated", data: movie});
    }    
}

export default new MoviesController();