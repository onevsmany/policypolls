import {Request, Response, NextFunction} from 'express'

import {ILogin, ISignup} from '../interfaces/index';



/**
 * @todo check if its req or req.body  
 * @todo decide on validation strategy
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
        next()
    }catch(e){
        throw new Error(`Invalid Input format ${e}`)
    }
}

const validateRoutes = {
    loginValidator,
    signupValidator
}

export default validateRoutes