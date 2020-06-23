import {Router, Request, Response, NextFunction} from 'express';
import isAuth from '../middlwares/auth'
import {getUserPolicy} from '../controllers/policyController'

const router = Router()
router.get('/getpolicy', isAuth, async (req:Request, res:Response, next:NextFunction) => {
    try{
        const userPolicy = getUserPolicy(req.params.id)
        res.status(200).send({
            'success':true,
            'message':userPolicy
        })
    }catch(e){
        res.status(400).send({
            'success':false,
            'error':e.message
        })
    }
})

export default router