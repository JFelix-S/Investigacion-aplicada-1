import { Request, Response, NextFunction } from  'express';
import jwt from 'jsonwebtoken';

const validateToken = async (req: Request, res: Response, next: NextFunction) =>{
    const headerToken: any = req.headers['authorizarion'];
    
    if(headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            //existe token
            const bearerToken = headerToken.slice(7);
            //verifica token
            jwt.verify(bearerToken,process.env.SECRET_KEY || 'y5;@7=XIlj#Rz0awH)gNef$2.(ZQ92@ilet5,$X11UopR.Ix+7')
            next()
        } catch (error) {
            res.status(401).json({
                msg: 'Acceso denegado: Token no valido.'
            })
        }
    } else {
        res.status(401).json({
            msg: 'Acceso denegado.'
        })
    }
}

export default validateToken;