import express, {Application} from 'express';
import allRoutes from '../routes/routes';
import dotenv from 'dotenv';

dotenv.config();
import { User } from './user';

export class Server{
    private app: Application;
    private port: string | undefined;

    constructor(){
        this.port = process.env.PORT || '3001'; //default port 3001
        this.app = express();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('App running on port ',this.port)
        })
    }

    routes(){
        this.app.use('/api/',allRoutes)
    }

    midlewares(){
        this.app.use(express.json());
    }

    async dbConnect(){
        try{
            await User.sync();
            console.log('====== db Connection has been established successfully ======');
        }catch( error){
            console.error('Unable connect to db ',error);
        }
    }
}

export default Server;