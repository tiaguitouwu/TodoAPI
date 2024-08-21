import { scrypt,randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt);

export class Authentication{

    async passToHash(password:string){
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buf.toString('hex')}.${salt}`

    }

    async pwdCompare(storedPassword: string, suppliedPassword: string){

        const parts = storedPassword.split('.')

        const [hasshedPassword,salt] = parts;

        if(!salt){
            throw new TypeError("Salt is undefined. Check if the password is stored in the correct format")
        }

        const buf = (await scryptAsync(suppliedPassword,salt,64)) as Buffer

        return buf.toString('hex') === hasshedPassword
    }

}

export const authenticationService = new Authentication()

