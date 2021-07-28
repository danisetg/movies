import {Schema, model, Document} from 'mongoose';
export interface IMovie extends Document {
    film: string;
    genre: string;
    lead_studio: string;
    audience_score: number;
    profitability: number;
    rotten_tomatoes: number;
    worldwide_gross: string;
    year: number;
}
const MovieSchema = new Schema({
    film: {type: String, required: true},
    genre: {type: String, required: true},
    lead_studio: {type: String, required: true},
    audience_score: {type: String, required: true},
    profitability: {type: String},
    rotten_tomatoes: {type: String, required: true},
    worldwide_gross: {type: String, required: true},
    year: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date,
});
export default model<IMovie>('Movie', MovieSchema);