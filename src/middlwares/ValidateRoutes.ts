import {Request, Response, NextFunction} from 'express';
import joi, {Schema, validate} from 'joi';
import jsonwebtoken, {verify} from 'jsonwebtoken'; 
import {JWT_KEY} from '../config/index'




/**
 * @description Router level middlewares to validate input to a route.  
 * @todo decide on validation strategy & use joi to vaidate schema properties. 
 */


export const loginValidator = async function(req:Request, res:Response, next:NextFunction){
    try{
        const schema:Schema = joi.object({
            email:joi.string()
                     .email({minDomainAtoms: 2})
                     .required(),
             password:joi.string()
                         .required()
         })
         await schema.validate(req.body);
        next()
    }catch(e){
        res.status(400).send({
            'success':false,
            'error': `${e.message}`

        }).end()
    }
} 

export const signupValidator = async function (req:Request, res:Response, next:NextFunction){
    try{
        const schema:Schema = joi.object({
            username:joi.string()
                        .required(),
            email:joi.string()
                    .email({minDomainAtoms:2})
                    .required(),
            password:joi.string()
                        .required()
        })
        schema.validate(req.body)
        next()
    }catch(e){
        res.status(400).
        send({
            'success':false,
            'error': e.message
        }).end()
    }
}

export const verifyTokenFromHeader =  async function(req){
    try{
        if (
            (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
            (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
          ) {
            const payload:any = await verify(req.headers.authorization.split(' ')[1], JWT_KEY);
            return payload
            
          }
        //   throw new Error('Token not specified correctly in the header')
    }catch(e){
        throw new Error(e.message)

    }

}


