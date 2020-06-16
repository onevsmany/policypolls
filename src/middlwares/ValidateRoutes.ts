import {Request, Response, NextFunction} from 'express'
import {ILogin, ISignup} from '../interfaces/index';



/**
 * @description Router level middlewares to validate input to a route.  
 * @todo decide on validation strategy & use joi to vaidate schema properties. 
 */
export const loginValidator = async function(req:Request, res:Response, next:NextFunction){
    try{
        const {email, password} = req.body;
        console.log(req.body, 'qewea')
        if(!email || !password){
            throw new Error('missing or invalid password')
        }
        next()
    }catch(e){
        res.status(400).send({
            'success':false,
            'message': `${e.message}`

        }).end()
    }
} 

export const signupValidator = async function (req:Request, res:Response, next:NextFunction){
    try{
        const {username, email, password} = req.body
        if (!username || !email || !password){
            throw new Error('Invalid or missing parameters')
        }
        next()
    }catch(e){
        res.status(400).
        send({
            'success':false,
            'message': e.message
        }).end()
    }
}

export const tokenValidator =  async function(req:Request, res:Response, next:NextFunction){
    try{
        if (
            (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
            (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
          ) {
            return req.headers.authorization.split(' ')[1];
          }
          return null;
    }catch(e){

    }

}


