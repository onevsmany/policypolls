import {Schema, Document, model} from 'mongoose';
import validator from 'validator';
import createToken from '../services/TokenAuth';
import bcrypt from 'bcrypt';


interface IUserModel extends Document{
    username:string,
    email:string,
    password:string,
    tokens: [{
        access:string,
        token:string
    }]
    generateAuthToken(),
    getIssues()
} 

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (value:string):boolean => validator.isEmail(value),
            message: 'Invalid Email'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    tokens: [{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
        
    }],

    // if isssues are predifined, add some custome validation here.
    policies:{
        type: Array,
        required: false,
        default: []

    }

});
UserSchema.pre<IUserModel>('save', async function(next){
    try{
        const user = await this;
        if (user.isModified('password')){
            const hash = await bcrypt.hash(user.password, 10 )
            user.password = await hash
        }
        next()
    }catch(e){
        throw new Error(``)
    }
    

})

UserSchema.methods.generateAuthToken = async function(){
    try{
        const id:string = this._id.toHexString()
        const access:string = 'auth'
        const token:string = await createToken(id, access)
        this.tokens.push({access, token});
        return token
    }catch(e){
        throw new Error(`Unable to generate token ${e}`)
    }
}

UserSchema.methods.getPolicies = async function(){
    try{
        const userIssues: string[] = this.issues;
        return userIssues
        
    }catch(e){
        throw new Error('Unable to get Isuues for this particular user');
    }
}

const User = model<IUserModel>('User', UserSchema);

export default User