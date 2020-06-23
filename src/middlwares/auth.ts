
import {Request, Response, NextFunction} from 'express';
import {verifyTokenFromHeader} from './ValidateRoutes';
import User from  '../models/user';
import {IPayload} from '../interfaces/index'

const isAuth = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const payload:IPayload = await verifyTokenFromHeader(req);
        console.log(payload)
        const user = await User.findOne({_id:payload.id})
        if (user){
            req.body = payload.id
            next();
        }else{
            throw new Error('Could not find a user associated with this token')
        }

    }catch(e){
       res.status(400).send({
           "success":false,
           "error":e.message
       })
    }
    
    

}

export default isAuth;

