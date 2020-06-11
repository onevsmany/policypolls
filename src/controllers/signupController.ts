import User from '../models/user';
import { ISignup } from '../interfaces/index'

const SignUp = async (body:ISignup) => {
    try {
        const user = new User(body);
        const token = await user.generateAuthToken();
        await user.save();
        return token;
    }catch(e){
        throw new Error('')
    }
 
}

export default SignUp