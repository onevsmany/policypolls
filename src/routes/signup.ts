import {Router, Request, Response, NextFunction} from 'express';
import validateRoutes from '../middlwares/ValidateRoutes';
import SignUp from '../controllers/signupController'

const router = Router();

router.use(validateRoutes.signupValidator)

router.post('/signup', async(req:Request, res:Response, next:NextFunction) => {
    try{
        const token = await SignUp(req.body) 
        await res.status(201).header('x-auth', token).send({
            'success':true,
            'message':'created new user'

        })
    }catch(e){
        res.status(500).send({
            'success':false,
            'message':e.message
        })
    }
    
})

export default router