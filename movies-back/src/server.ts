import express from "express";
import morgan from "morgan";
import indexRoutes from './routes/index.routes';
import moviesRoutes from './routes/movies.routes';
import usersRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import commentsRoutes from './routes/comments.routes';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import Movie, { IMovie } from '../src/models/movie.model';
import csvtojson from 'csvtojson';
import User, { IUser } from './models/user.model';



dotenv.config();

class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
    }

    config(){
        const MONGO_URI = 'mongodb://database/movies';
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(db => {
            console.log('Connected to DB');
            this.seedMovies();
        });

        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(compression());
        this.app.use(cors());
        
    }

    async seedMovies() {
        let count = await Movie.countDocuments();
        console.log("count: ", count);
        if(!count) {
            const fileName = 'movies.csv';
            csvtojson().fromFile(fileName).then(async source => {
                // Fetching the all data from each row
                for (var i = 0; i < source.length; i++) {
                     var oneRow = {
                         film: source[i]['Film'],
                         genre: source[i]['Genre'],
                         lead_studio: source[i]['Lead Studio'],
                         audience_score: source[i]['Audience score %'],
                         profitability: source[i]['Profitability'],
                         rotten_tomatoes: source[i]['Rotten Tomatoes %'],
                         worldwide_gross: source[i]['Worldwide Gross'],
                         year: source[i]['Year']
                     };
                     const movie: IMovie = new Movie(oneRow);
                     console.log(movie);
                     await movie.save();
                 }
            });
        }
        let countUser = await User.countDocuments();

        console.log(await User.find());
        if(!countUser) {
            const user: IUser = new User({
                name: 'admin',
                email: 'admin@gmail.com',
                password: 'admin'
            });
            user.password = await user.encryptPassword(user.password);
            await user.save();
        }
    }

    routes(){
        this.app.use(indexRoutes);
        this.app.use('/api/movies', moviesRoutes);
        this.app.use('/api/users', usersRoutes);
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/comments', commentsRoutes);      
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.routes();
server.start();