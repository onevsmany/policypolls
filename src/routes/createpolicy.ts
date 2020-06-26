import {Router, Request, Response} from 'express';
import isAuth from '../middlwares/auth'
import {createPolicy} from '../controllers/policyController'
import {validatePolicy} from '../middlwares/ValidateRoutes'

const router = Router()

router.post('/createpolicy', isAuth, validatePolicy, async (req:Request, res:Response) => {
    try{
        await createPolicy(req.params.id, req.body.policy)
        res.status(201).send({
            'success':true,
            'message':'created policy'
        })

    }catch(e){
        res.status(500).send({
            'sucess':false,
            'error':e.message
        })
    }
})

export default router