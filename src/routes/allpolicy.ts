import {Router, Request, Response} from 'express';

import {allPolicy} from '../controllers/policyController'

const router = Router()

router.get('/policies', (req:Request, res:Response) => {
    try{


    }catch(e){
        res.status(500).json({
            'success':false,
            'error':e.message
        })
    }
})