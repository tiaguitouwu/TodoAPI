import mongoose, { mongo } from "mongoose";
import { authenticationService } from "../../common/src/services/authenticate";

export interface UserDoc extends mongoose.Document{
    username:string,
    password:string
}

export interface CreateUserDto{
    username:string,
    password:string
}

export interface UserModel extends mongoose.Model<UserDoc>{
    build(dto:CreateUserDto):UserDoc
}


const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique: true 
    },
    password: {
        type:String,
        required:true
    }
});


userSchema.pre('save', async function(done) {
    if(this.isModified('password') || this.isNew) {
        const hashedPwd = await authenticationService.passToHash(this.get('password'));
        this.set('password', hashedPwd)
    }
    done()
})

userSchema.statics.build = (createUserDto: CreateUserDto) => {
    return new User(createUserDto)
}


export const User = mongoose.model<UserDoc, UserModel>('User',userSchema)



