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
    try{
        const payload = await jsonwebtoken.verify(token, JWT_KEY)
    console.log(payload)

    }catch(e){
        console.log(e.message)
    }

}

auth('ejyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZThlODhkOGFiMTI2NWIzNDQ1YTBhYSIsImFjY2VzcyI6ImF1dGgiLCJpYXQiOjE1OTI5MTE1MjEsImV4cCI6MTU5MzA4NDMyMX0.rjKGKs6gvxqjAwSPoE0bsyD1VqCRYmCjNEkiqr9tJ9A')