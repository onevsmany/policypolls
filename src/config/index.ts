import dotenv from 'dotenv';
import path from 'path';


interface env {
    DB_CONNECTION:string | undefined,
    PORT:number | undefined,
}

const envPATH:string = path.resolve(process.cwd(), '../', '../', '.env');
const envFound = dotenv.config({path:envPATH});

// Error handling for the absence of a .env file
if (envFound.error){
    throw new Error(" Could not find a .env file ");
}


/**
 * @todo figure out corect types structuring for prodction 
 */

let config;
switch(process.env.NODE_ENV){
    
    case "production":
        config = {
            DB_CONNECTION:process.env.CLUSTER_SRV,
            PORT: process.env.PORT
        }
        break;

    case "test":
        config = {
            DB_CONNECTION:process.env.TEST_SRV,
            PORT: 5321
        }
        break;

    default:
        config = {
            DB_CONNECTION:"mongodb://127.0.0.1:27017",
            PORT: 3000
        }
    
}
export const JWT_KEY = process.env.JWT_KEY

export default config;


