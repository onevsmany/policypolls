import {JWT_KEY} from '../config/index';
import jsonwebtoken from 'jsonwebtoken';

const createToken = (id:string, access:string) => {
    const unsigned = {
        id,
        access
    }
    const signed = jsonwebtoken.sign(unsigned, JWT_KEY, {
        expiresIn:323
    });
    return signed 
} 

export default createToken