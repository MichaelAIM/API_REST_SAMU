import { Request, Response } from "express";
import Funcionario from "../models/funcionario";


export const getFuncionarios = async( req: Request, res: Response) => {
    const funcionarios = await Funcionario.findAll();
    res.json({
        funcionarios
    });
}

export const getFuncionariosDisponibles = async( req: Request, res: Response) => {
    const funcionarios = await Funcionario.findAll(
        {
            where: {
                estado: 1
            }
        }
    );

    res.json({
        funcionarios
    });
}

export const getFuncionariosRut = async( req: Request, res: Response) => {
    const { id } = req.params;
    const funcionario = await Funcionario.findOne(
        {
            where: {
                rut: id
            }
        }
    );

    if( funcionario ){
        res.json({
            funcionario
        });
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el rut = ${ id }`
        });
    }
}

export const getFuncionario= async( req: Request, res: Response) => {
    const { id } = req.params;
    const funcionario = await Funcionario.findByPk( id );
    if( funcionario ){
        res.json({
            funcionario
        });
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id = ${ id }`
        });
    }
}

export const postFuncionario = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const funcionario = await Funcionario.create(body);        
        res.json({
            funcionario
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }

}

export const postFuncionarios = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const funcionario = await Funcionario.bulkCreate(body);        
        res.json({
            funcionario
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }

}

export const putFuncionario = ( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'Put Funcionarios',
        id,
        body
    });

}

export const deleteFuncionario = ( req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Delete Funcionarios',
        id
    });

}