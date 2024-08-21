import { Router, Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../../common';
import { User, UserDoc } from '../../Modules/usuario';
import { Todo } from '../../Modules/todo'
import mongoose from 'mongoose';

const router = Router();

router.post('/api/todo/new', async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;

    if (!title) return next(new BadRequestError('A title is required'));
    
    const userId = req.currentUser!.userId;

    const usuario = await User.findOne({ _id: userId })

    if (!usuario) return next(new BadRequestError('User not found'));

    const userObjectId = usuario._id as mongoose.Types.ObjectId;

    const newTodo = Todo.build({
        title,
        completado: false,
        user: [userObjectId]
    });

    await newTodo.save();

    res.status(201).send(newTodo);
});

export { router as newTodoRouter };
