import { Router, Request, Response, NextFunction } from 'express'
import { User } from '../../Modules/usuario'
import { authenticationService, BadRequestError } from '../../../common'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/api/user/signin', async (req: Request, res: Response, next: NextFunction) => {
    const { usuario, password } = req.body;

    if(!usuario || !password)return next(new BadRequestError('Username and password are require'))

    const user = await User.findOne({ username:usuario });
    if(!user) return next(new BadRequestError('Wrong credentials'))

    const isEqual = await authenticationService.pwdCompare(user.password, password);
    if(!isEqual) return next(new BadRequestError('Wrong credentials'))

    const token = jwt.sign({ usuario, userId: user._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '600000' })

    req.session = { jwt: token }

    res.status(200).send({token})

})

export { router as signinrouter }