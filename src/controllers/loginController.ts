import User from '../models/user';

const login = async (email:string, password:string) => {
    try{
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        return token
    }catch(e){
        throw new Error(e.message)
    }
   
    
}

export default login