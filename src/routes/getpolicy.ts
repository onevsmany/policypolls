import {Router, Request, Response, NextFunction} from 'express';
import isAuth from '../middlwares/auth'
import {getUserPolicy} from '../controllers/policyController'

const router = Router()
router.get('/getpolicy', isAuth, async (req:Request, res:Response) => {
    try{
        const userPolicy = await getUserPolicy(req.params.id)
        await res.status(200).json({
            'success':true,
            'message':userPolicy
        })
    }catch(e){
        res.status(400).json({
            'success':false,
            'error':e.message
        })
    }
})

export default router