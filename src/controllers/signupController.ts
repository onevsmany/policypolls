import User from '../models/user';
import { ISignup } from '../interfaces/index'

/**
 * 
 * @todo decide between running query twice for custome or once for speed
 */

const SignUp = async (body:ISignup) => {
    try {
        const exist = await User.findOne({email:body.email}).exec()
        if (exist){
            throw new Error('A user with this email already exists')
        }
        const user = await new User(body);
        const token = await user.generateAuthToken();
        return token;
    }catch(e){
        throw new Error(`${e.message}`)
    }
 
}

export default SignUp