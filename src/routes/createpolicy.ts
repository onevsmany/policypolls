import {Router, Request, Response, NextFunction, request} from 'express';
import isAuth from '../middlwares/auth'
import {createPolicy} from '../controllers/policyController'

const router = Router()

router.post('/createpolicy', isAuth, async (req:Request, res:Response) => {
    try{
        await createPolicy(req.params.id, req.body)
        res.status(201).send({
            'success':false,
            'message':'created policy '
        })

    }catch(e){
        res.status(500).send({
            'sucess':false,
            'error':e.message
        })
    }
})

export default router