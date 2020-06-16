import {Schema, Document, Model, model} from 'mongoose';
import validator from 'validator';
import createToken from '../services/TokenAuth';
import bcrypt from 'bcrypt';


interface IUserDocument extends Document{
    username:string,
    email:string,
    password:string,
    tokens: [{
        access:string,
        token:string
    }],
    policies: string[],
    generateAuthToken: () => string,
    addPolicies: (policyArray:string[]) => void,
    getPolicies: () => string[]

    
} 

interface IUserModel extends  Model<IUserDocument>{
    findByCredentials: (email:string, password:string) => Promise<IUserDocument>
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
UserSchema.pre<IUserDocument>('save', async function(next){
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

UserSchema.methods.generateAuthToken = async function<IUserModel>(){
    try{
        const id:string = this._id.toHexString()
        const access:string = 'auth'
        const token:string = await createToken(id, access)
        this.tokens.push({access, token});
        this.save()
        return token
    }catch(e){
        throw new Error(`Unable to generate token ${e}`)
    }
}

UserSchema.methods.getPolicies = async function(){
    try{
        const userPolicies: string[] = this.policies;
        return userPolicies
        
    }catch(e){
        throw new Error('Unable to get policies for this particular user');
    }
}

UserSchema.methods.addPolicies = async function<IUserModel>(policy:string[]){
    try{
        this.policies.concat(policy)
        this.policies.save()

    }catch(e){
        throw new Error('error adding policy for this user')
    }
}


UserSchema.statics.findByCredentials = async function (email, password){
    try{
        const user = await this.findOne({email:email}).catch(e => {
            throw new Error('Could not find a user with email')
        });
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            throw new Error('Incorrect Password')
        }
        return user
    }catch(e){
        throw Error(e.message)
    }
   
    
};

const User:IUserModel = model<IUserDocument, IUserModel>('User', UserSchema);


export default User

