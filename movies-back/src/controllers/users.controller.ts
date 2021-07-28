import {Request, Response, Router} from 'express';
import User from '../models/user.model';

class UsersController {
    
    constructor() {
    }
    async getUser(req: Request, res: Response) {
        const user = await User.findById(req.params.id);
        res.json(user);
    }

    async getUsers(req: Request, res: Response) {
        const users = await User.find();
        res.json(users);
    }

    async createUser(req: Request, res: Response){
        const user = new User(req.body);
        await user.save();
        res.json({message: "User created", data: user});
    }

    async deleteUser(req: Request, res: Response) {
        await User.findByIdAndDelete(req.params.id);
        res.json({mesage: "user deleted"});
    }

    async updateUser(req: Request, res: Response) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({message: "user updated", data: user});
    }

    routes() {
    }

   
}

export default new UsersController();