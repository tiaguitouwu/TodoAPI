import {Router,Request,Response,NextFunction} from 'express'
import {NotAuthorizeError} from '../errors/not-authorize-error'



export const requireAuth = async(req:Request, res: Response, next: NextFunction)=>{

    if(!req.currentUser) return next(new NotAuthorizeError())
    next()
}