import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';

declare global{
    interface JwtPayload{
        username: string,
        userId: string
    }
    namespace Express{
        interface Request{
            currentUser?:JwtPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1] || req.session?.jwt;

    if (token == null) return next(new BadRequestError('Necesita Iniciar Sesión'));
    try{
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload ;
        req.currentUser = payload
    } catch(error){
        return next(error)
    }
    next()
};

export {currentUser as AuthenticateMiddleware}