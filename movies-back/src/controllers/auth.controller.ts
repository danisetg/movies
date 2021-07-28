import {Request, Response, Router} from 'express';
import User, {IUser} from '../models/user.model';
import jwt from 'jsonwebtoken';

class AuthController {

    
    constructor() {
    }
    async signin(req: Request, res: Response) {
        const user = await User.findOne({email: req.body.email});
        console.log(user);
        if(!user)
            return res.status(400).send({message: "Wrong email or password"});
        let correctPassword = await user.validatePassword(req.body.password);
        if(!correctPassword)
            return res.status(400).send({message: "Wrong email or password"});
        
        let token = jwt.sign({_id: user?._id}, process.env.SECRET_KEY || 'token auxiliar en caso de que el otro no exista',{
            expiresIn: 60*60*24*7
        });
        return res.send({message: "Correctly signed in", data: {user, token: token}});
    }

    async signup(req: Request, res: Response) {
       const userExist = await User.findOne({email: req.body.email});
       if(userExist)
            res.status(400).send({mesage: "Email already registered"});
        else {
            const user: IUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            user.password = await user.encryptPassword(user.password);
            const savedUser = await user.save();
            let token = jwt.sign({_id: savedUser._id}, process.env.SECRET_KEY || 'token auxiliar en caso de que el otro no exista');
            res.json({message: "Correctly signed up", token: token});
        }       
    }  
}

export default new AuthController();;