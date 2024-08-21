import { CustomError } from "./custom-error"


export class NotFoundError extends CustomError{
    statusCode = 404

    constructor(){
        super('Not Found!')
    }

    GenerateErrors(){
        return [{ message: 'Not Found'}]
    }
}
