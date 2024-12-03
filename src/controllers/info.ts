import { Request, Response } from  'express';

export const protectedResource =  (req: Request, res: Response) =>{
    res.json({
        msg: "Informacion del Recurso Compartido."
    })
}