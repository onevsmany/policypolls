import JWT_SCECRET from '../config/index';
import jsonwebtoken from 'jsonwebtoken';

const createToken = (id:string, access:string) => {
    const unsigned = {
        id,
        access
    }

    const signed = jsonwebtoken.sign(unsigned, JWT_SCECRET);
    return signed 
} 

export default createToken