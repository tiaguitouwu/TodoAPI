import {Router,Request,Response,NextFunction} from 'express'
import {Todo} from '../../Modules/todo'
import { BadRequestError } from '../../../common'

const router = Router()

router.put('/api/todo/setCompleted',async(req:Request, res:Response, next:NextFunction)=>{
    
    const {id,completado} = req.body

    if(!id){ 
       next(new BadRequestError('An id is require'))
    }
    
    let updatedTodo

    try {
        updatedTodo = await Todo.findOneAndUpdate(
            {_id: id},
            {$set:{completado}},
            {new:true}
        )
    } catch (error) {
        next(new BadRequestError('An error has occurred'))
        
    }

    res.status(200).send(updatedTodo);
})

export {router as updateTodoRouter}