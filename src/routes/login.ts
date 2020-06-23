import {Router, Request, Response } from 'express';
import {loginValidator} from '../middlwares/ValidateRoutes'
import login from '../controllers/loginController'

const router = Router();


router.post('/login', loginValidator, async (req:Request, res:Response) => {
    try{
        const {email, password} = await req.body 
        const token = await login(email, password) 
        res.header('x-auth', token)
        .status(200)
        .send({
            'success':true,
            'message':'user signed in'
        })
    }catch(e){
        res.status(400)
        .send({
            'success':false,
            'error':e.message
        })
    }
})

export default router