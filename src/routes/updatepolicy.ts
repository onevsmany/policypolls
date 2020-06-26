import {Router, Request, Response, request} from 'express';
import isAuth from '../middlwares/auth'
import {validatePolicy} from '../middlwares/ValidateRoutes'
import {updateUserPolicy} from '../controllers/policyController'

const router = Router();

router.patch('/updatepolicy', isAuth, validatePolicy, async (req:Request, res:Response) =>{
    try{
        await updateUserPolicy(req.params.id, req.body.policy)
        await res.status(200).json({
            'success':true,
            'message': 'policies updated'
        })

    }catch(e){
        res.status(500).json({
            'success':false,
            'error':e.message
        })
    }
})

export default router