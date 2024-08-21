import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
import { UserDoc } from "./usuario";

export interface TodoDocs extends mongoose.Document{
    title:string,
    completado:boolean,
    user:mongoose.Types.ObjectId[]
}

export interface CreateTodoDto{
    title:string,
    completado:boolean,
    user:mongoose.Types.ObjectId[]
}

export interface TodoModel extends mongoose.Model<TodoDocs>{
    build(dto:CreateTodoDto): TodoDocs
}

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    completado:{
        type:Boolean,
        default:false,
        required:true
    },
    user: { type: Schema.Types.ObjectId, ref: 'usuario', required: true }
});

todoSchema.statics.build = (createTodoDto: CreateTodoDto) => new Todo(createTodoDto)

export const Todo = mongoose.model<TodoDocs, TodoModel>('Todo',todoSchema)