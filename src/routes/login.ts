import {Router, Request, Response } from 'express';
import validateRoutes from '../middlwares/ValidateRoutes'

const router: Router = Router();
router.use(validateRoutes.loginValidator)
router.use(validateRoutes.tokenValidator)

router.get('/login', async (req, res) => {
    try{

        
    }catch{

    }
})