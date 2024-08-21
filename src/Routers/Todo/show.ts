import {Router,Request,Response,NextFunction} from 'express'
import {Todo} from '../../Modules/todo'

const router = Router()

router.post('/api/todo/show',async(req:Request, res:Response, next:NextFunction)=>{
    const { id } = req.body
    const userId = req.currentUser!.userId;

    if(!id){ 
        const allTodo = await Todo.find({ user: userId })
        
        return res.status(200).send(allTodo);
    }
    
    const showPost = await Todo.findOne({ _id: id, user: userId });

    res.status(200).send(showPost);
})

router.post('/api/todo/show/getMaxId',async(req:Request, res:Response, next:NextFunction)=>{
    
    const showMaxTodoId = await Todo.find({},'_id').sort({id : -1}).limit(1)

    res.status(200).send(showMaxTodoId);
})

export {router as showTodoRouter}