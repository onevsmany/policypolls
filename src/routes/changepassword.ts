import {Router, Request, Response} from 'express';

import isAuth from '../middlwares/auth'
import {changeUserPassword} from '../controllers/auth'
import {validatePasswordChange} from '../middlwares/ValidateRoutes'
const router = Router()

router.post('changepassword', isAuth, validatePasswordChange, async(req:Request, res:Response) => {
    try{
        await changeUserPassword(req.params.id, req.body.oldPassword, req.body.newPassword)
        await res.status(200).json({
            'success':true,
            'message':'Password updated successfully'
        })

    }catch(e){
        res.status(400).json({
            'success':false,
            'error':e.message

        })
    }
    
})