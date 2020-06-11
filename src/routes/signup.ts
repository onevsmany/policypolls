import {Router, Request, Response, NextFunction} from 'express';
import validateRoutes from '../middlwares/ValidateRoutes';
import SignUp from '../controllers/signupController'

const router = Router();

router.use(validateRoutes.signupValidator)

router.post('/signup', async(req:Request, res:Response, next:NextFunction) => {
    try{
        const token = await SignUp(req.body) 
        res.status(200).send(token)

    }catch(e){
        throw new Error(`${e}`)
    }
    
})