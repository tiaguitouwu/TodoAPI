import {Router,Request,Response,NextFunction} from 'express'
import { User } from '../../Modules/usuario';
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../../../common';

const router =  Router() 

router.post('/api/user/signup', async(req:Request,res:Response,next:NextFunction)=>{
    const { username,password } = req.body
    
    const userExist = await User.findOne({username});

    if(userExist) return next(new BadRequestError('Usario ya existe'))

    const newUser = User.build({username,password})

    await newUser.save()

    const token = jwt.sign({ username, userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '10h' })

    req.headers = { authorization:  token }

    res.status(201).send({token})

})

export {router as SignUpRouter}