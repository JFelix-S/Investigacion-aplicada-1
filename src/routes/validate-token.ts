import { Request, Response, NextFunction } from  'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const validateToken = async (req: Request, res: Response, next: NextFunction) =>{
    const headerToken: any = req.headers['authorizarion'];
    
    if(headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            //existe token
            const bearerToken = headerToken.slice(7);
            //verifica token
            jwt.verify(bearerToken,process.env.SECRET_KEY || 'softKey')
            next()
        } catch (error) {
            res.status(401).json({
                msg: 'Acceso denegado: Token no valido.'
            })
        }
    } else {
        res.status(401).json({
            msg: 'Acceso denegado No Token.'
        })
    }
}

export default validateToken;