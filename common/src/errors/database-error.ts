import { CustomError } from "./custom-error";


export class DatabaseError extends CustomError{

    statusCode = 500;

    constructor(){
        super(`Couldn't Connect to database`)
    }

    GenerateErrors(){
        return [{message:`Couldn't Connect to database`}]
    }
}