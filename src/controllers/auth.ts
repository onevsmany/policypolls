import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user';
import {JWT_KEY} from '../config/index';

const auth = (token) => {
    const payload = jsonwebtoken.verify(token, JWT_KEY);
    const _id = payload.id
    const user = User.findOne({_id:_id})
    return user 

}

export default auth;
