import {Schema, model} from 'mongoose';

const CommentSchema = new Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    movie_id: {type:Schema.Types.ObjectId, ref: 'Movie'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date,
});


export default model('Comment', CommentSchema);