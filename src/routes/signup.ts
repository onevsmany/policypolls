import {Router, Request, Response, NextFunction} from 'express';

import {signupValidator} from '../middlwares/ValidateRoutes';
import SignUp from '../controllers/signupController'

const router = Router();

router.post('/signup', signupValidator, async(req:Request, res:Response) => {
    try{
        const token = await SignUp(req.body) 
        await res.status(201).header('x-auth', token).send({
            'success':true,
            'message':'created new user'
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            'success':false,
            'error':e.message
        })
    }
    
})

export default router