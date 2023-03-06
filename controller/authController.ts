import { Request, Response } from "express";
import { generarJWT } from "../helpers/generarJWT";
import Funcionario from "../models/funcionario";

export const login = async( req: Request, res: Response) => {
    const { key } = req.body;
    try {
        const dcrypt = Buffer.from(key, 'base64').toString('utf-8');
        // console.log(dcrypt);
        const newDcrypt = dcrypt.slice(1);
        const rutFuncionario =  Buffer.from(newDcrypt, 'base64').toString('utf-8');
        // console.log(rutFuncionario);
        const funcionario:any = await Funcionario.findOne({
            where: {
                estado: 1,
                rut:rutFuncionario
            },
        });
        if(!funcionario){
            return res.status(400).json({
                msg: "el funcionario no existe"
            });
        }
        
        const token = await generarJWT(funcionario.id);
        res.json({
            funcionario,
            token
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });  
    }
}

export const loginApp = async( req: Request, res: Response) => {
    const { password } = req.params;
    try {
        const funcionario:any = await Funcionario.findOne({
            where: {
                estado: 1,
                password
            },
        });
        if(!funcionario){
            return res.status(400).json({
                msg: "el funcionario no existe"
            });
        }
        
        const token = await generarJWT(funcionario.id);
        res.json({
            funcionario,
            token
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });  
    }
}
