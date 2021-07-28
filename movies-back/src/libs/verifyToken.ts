import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({message: 'Access Denied'});

    const payload = jwt.verify(token, process.env.SECRET_KEY || 'token auxiliar en caso de que el otro no exista');

    next();
}