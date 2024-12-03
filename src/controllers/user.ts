import { Request, Response } from  'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response) =>{

    const { userName, password, email } = req.body;
    // Validamos si el usuario ya existe en la db //? si cumple finaliza la ejecución
    const user =  await User.findOne({ where: { userName: userName} })
    if(user){
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre: ${userName}`,
        })
    }
    const hashedPass = await bcrypt.hash(password,10);
    try{
        // Guardamos usuario en db
        await User.create({
            userName: userName,
            password: hashedPass,
            email: email,
        })

        res.json({
            msg: `Usuario ${userName} creado exitosamente.`,
        })
    } catch (error) {
        res.status(400).json({
            msg: `Upss ocurrrio un error.`,
            error
        })
    }
}

export const login = async (req: Request, res: Response) =>{

    const { userName, password } = req.body;
    
    // Validamos si el usuario ya existe en la db //? si  no cumple finaliza la ejecución
    const user: any =  await User.findOne({ where: { userName: userName} })

    if(!user){
        return res.status(400).json({
            msg: `No existe un usuario con el nombre: ${userName}.`,
        })
    }

    //validamos password //? si  no cumple finaliza envia mensaje
    const passwordValid = bcrypt.compare(password,user.password)
    if(!passwordValid){
        return res.status(400).json({
            msg: `Contraseña incorrecta.`,
        })
    }

    //Generamos token
    const token = jwt.sign({
        userName: userName
    },process.env.SECRET_KEY || 'y5;@7=XIlj#Rz0awH)gNef$2.(ZQ92@ilet5,$X11UopR.Ix+7',{
        expiresIn: '1,800,000' //! Timpo de duración 30 min
    })

    res.json({token})
}