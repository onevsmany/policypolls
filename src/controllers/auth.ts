import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user';
import {JWT_KEY} from '../config/index';

interface Iauth{
    id: string,
    access: string,
    iat: number,
    exp: number
}

const auth = async (token) => {
   

}
