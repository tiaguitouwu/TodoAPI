import express from 'express'
import {Request,Response,NextFunction} from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cors from 'cors'
import cookieSession from 'cookie-session'
import { JwtPayload } from 'jsonwebtoken'


//CONFIG PARA CORRER SERVER
dotenv.config();

const app = express()
app.use(cors({
     origin:"*", 
     optionsSuccessStatus:200,
     credentials:true
    }))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.set('trust proxy',true)
app.use(cookieSession({
    signed:false,
    secure: false
}))



//ROUTERS
import{
    deletedTodoRouter,
    newTodoRouter,
    showTodoRouter,
    updateTodoRouter,
    SignUpRouter,
    signinrouter,
    requireAuth,
    currentUser,
    errorHandler,
    NotFoundError,
    signoutRouter,
    currentUserRouter
} from './src/Routers'

app.use(SignUpRouter)
app.use(signinrouter)
app.use(signoutRouter)
app.use(currentUser)
app.use(currentUserRouter)



//Todo
app.use(requireAuth,showTodoRouter)
app.use(requireAuth,newTodoRouter)
app.use(requireAuth,deletedTodoRouter)
app.use(requireAuth,updateTodoRouter)



app.all('*',(req:Request, res:Response,next:NextFunction) =>{
    next(new NotFoundError())
})

app.use(errorHandler)


declare global {
    namespace Express {
      interface Request {
        user?: string | JwtPayload;
      }
    }
}




//CONEXIÓN A BASE DE DATOS
const start = async ()=>{
    if(!process.env.MONGO_URI){
        throw new Error('Connection not set')
    }
    if(!process.env.ACCESS_TOKEN_SECRET){
        throw new Error('JWT not set')
    } 
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("HAY SEÑAL!!")
    } catch (error) {
        console.log(error)
    }
}

start()

const PORT = process.env.PORT;

const server = app.listen(PORT,()=>{
    console.log("Connected at 8080")
})

