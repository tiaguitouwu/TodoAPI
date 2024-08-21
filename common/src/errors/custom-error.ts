export abstract class CustomError extends Error{
    abstract statusCode:number;

    constructor(message:string){
        super(message)
    }
    
    abstract GenerateErrors():{ message:string, field?:string}[]
}