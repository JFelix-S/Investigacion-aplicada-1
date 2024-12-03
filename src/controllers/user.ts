import { Request, Response } from  'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config();

export const register = async (req: Request, res: Response) =>{

    const { username, password, email } = req.body;
    // Validamos si el usuario ya existe en la db //? si cumple finaliza la ejecución
    const user =  await User.findOne({ where: { username: username} })
    if(user){
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre: ${username}`,
        })
    }

    const mail =  await User.findOne({ where: { email: email} })
    if(mail){
        return res.status(400).json({
            msg: `Ya existe un usuario con el email: ${email}`,
        })
    }

    const hashedPass = await bcrypt.hash(password,10);
    try{
        // Guardamos usuario en db
        await User.create({
            username: username,
            password: hashedPass,
            email: email,
        })

        res.status(201).json({
            msg: `Usuario ${username} creado exitosamente.`,
        })
    } catch (error) {
        res.status(400).json({
            msg: `Upss ocurrrio un error.`,
            error
        })
    }
}

export const login = async (req: Request, res: Response) =>{

    const { username, password } = req.body;
    
    // Validamos si el usuario ya existe en la db //? si  no cumple finaliza la ejecución
    const user: any =  await User.findOne({ where: { username: username} })

    if(!user){
        return res.status(400).json({
            msg: `No existe un usuario con el nombre: ${username}.`,
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
    username: username
    },process.env.SECRET_KEY || 'softKey',{
        expiresIn: '900000' //! Timpo de duración 30 min
    })

    res.json({token})
}