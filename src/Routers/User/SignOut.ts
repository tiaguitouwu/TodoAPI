import { Router, Response, NextFunction ,Request } from 'express'

const router = Router()

router.post('/api/user/signout', async (req: Request, res: Response, next: NextFunction) => {
    req.session = null;
    res.send({})
})

export { router as signoutRouter }