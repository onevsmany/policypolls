import {Request, Response, NextFunction} from 'express'
import {ILogin, ISignup} from '../interfaces/index';



/**
 * @description Router level middlewares to validate input to a route.  
 * @todo decide on validation strategy & use joi to vaidate schema properties. 
 */
const loginValidator = async function(req:Request, res:Response, next:NextFunction){
    try{
        const {email, password} = req.body;
    }catch(e){
        throw new Error(`Invalid Input format: ${e}`)
    }
} 

const signupValidator = async function (req:Request, res:Response, next:NextFunction){
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

const tokenValidator =  async function(req:Request, res:Response, next:NextFunction){
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

const validateRoutes = {
    loginValidator,
    signupValidator,
    tokenValidator
}

export default validateRoutes