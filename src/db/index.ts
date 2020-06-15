import mongoose from 'mongoose';
import config from '../config/index'

/**
 * @todo 
 * abstract this connection from here to an environmental varaiable 
 */
const connectionString: string = config.DB_CONNECTION


async function connectDB(){
    try{
        mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} );
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', ()=> console.log('Connected to Database'));
            
    }catch(e){
            console.log(`Error connecting to db: ${e.message}`)
    }
}





export default connectDB;

