import { Router, Request, Response } from 'express';

import { allPolicy } from '../controllers/policyController';
import Policy from '../models/policy';

const router = Router();

/**
 * @todo final data should look this
 * {
 *   "education":5
 *   "healthcare":10
 * }
 */

router.get('/policies', async (req: Request, res: Response) => {
	try {
		const PolicyCount = await allPolicy();
		res.status(200).json({
			success: true,
			message: PolicyCount
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			error: e.message
		});
	}
});

export default router;
