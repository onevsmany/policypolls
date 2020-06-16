import {Router, Request, Response } from 'express';
import {loginValidator} from '../middlwares/ValidateRoutes'
import login from '../controllers/loginController'

const router: Router = Router();
router.use(loginValidator)


router.post('/login', async (req, res) => {
    try{
        const {email, password} = await req.body 
        const token = await login(email, password) 
        res.header('x-auth', token)
        .status(200)
        .send({
            'success':true,
            'message':'user signed in'
        })
        ;
    }catch(e){
        res.status(400)
        .send({
            'success':false,
            'message':e.message
        })
    }
})

export default router