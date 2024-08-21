import { CustomError } from "./custom-error";


export class BadRequestError extends CustomError{
    statusCode = 400;

    constructor(public message:string){
        super(message);       
    }

    GenerateErrors(){
        return [{message: this.message}]
    }
}

