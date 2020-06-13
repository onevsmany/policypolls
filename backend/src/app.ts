import express from 'express';
import config from './config/index'
import signup from './routes/signup';
import connectDB from './db';

const startApp = async () => {
    connectDB();
    const app = express()
    app.use(express.json())
    app.use(signup)
    app.listen(config.PORT, () => {
        console.log(`server up and running on port ${config.PORT}`)
    })
}
export default startApp
