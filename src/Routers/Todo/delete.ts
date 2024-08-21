import {Router,Request,Response,NextFunction} from 'express'
import { Todo } from '../../Modules/todo'
import { BadRequestError } from '../../../common'

const router = Router()

router.delete('/api/todo/delete',async(req:Request, res:Response, next:NextFunction)=>{
    const { id } = req.body

    if(!id){ 
       return next(new BadRequestError('An id is require'))
    }
    
    let deletedTodo = await Todo.findOneAndDelete({_id:id })

    res.status(200).send(deletedTodo);

})

router.delete('/api/todo/deleteAllComplete',async(req:Request, res:Response, next:NextFunction)=>{

    let deletedTodo = await Todo.deleteMany({completado:true})
    
    res.status(200).send(deletedTodo);

})


export {router as deletedTodoRouter}