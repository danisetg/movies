import {Request, Response, Router} from 'express';
import Comment from '../models/comment.model';

class CommentsController {

    
    constructor() {
    }
    async getComment(req: Request, res: Response) {
        const comment = await Comment.findById(req.body.id);
        res.json(comment);
    }

    async getComments(req: Request, res: Response) {
        const comments = await Comment.find({movie_id: req.query.movie_id});
        res.json(comments);
    }

    async createComment(req: Request, res: Response){
        const comment = new Comment(req.body);
        await comment.save();
        res.json({message: "Comment created", data: comment});
    }

    async deleteComment(req: Request, res: Response) {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({mesage: "Comment deleted"});
    }

    async updateComment(req: Request, res: Response) {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({message: "Comment updated", data: comment});
    }   
}

export default new CommentsController();