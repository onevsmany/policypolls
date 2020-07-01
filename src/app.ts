import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import config from './config/index';
import signup from './routes/signup';
import login from './routes/login';
import getPolicy from './routes/getpolicy';
import createPolicy from './routes/createpolicy';
import updatePolicy from './routes/updatepolicy';
import allPolicy from './routes/allpolicy';
import connectDB from './db';

const startApp = async () => {
	const limiter = rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100
	});
	connectDB();
	const app = express();
	app.use(express.json());
	app.use(helmet());
	app.use(limiter);

	app.use(signup);
	app.use(login);
	app.use(allPolicy);
	app.use(createPolicy);
	app.use(getPolicy);
	app.use(updatePolicy);
	app.listen(config.PORT, () => {
		console.log(`server up and running on port ${config.PORT}`);
	});
};
export default startApp;
