import { CustomError } from "./custom-error"


export class NotAuthorizeError extends CustomError{
    statusCode = 401

    constructor(){
        super('Not Authorize')
    }

    GenerateErrors(){
        return [{ message: 'Not Authorize'}]
    }
    

}