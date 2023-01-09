import { Request, Response } from "express";
import Paciente from "../models/paciente";


export const getPacientes = async( req: Request, res: Response) => {
    const Pacientes = await Paciente.findAll();
    res.json({
        Pacientes
    });
}

export const getPaciente= async( req: Request, res: Response) => {
    const { id } = req.params;
    const paciente = await Paciente.findByPk( id );
    if( Paciente ){
        res.json({
            paciente
        });
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id = ${ id }`
        });
    }
}

export const postPaciente = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const paciente = await Paciente.create(body);        
        res.json({
            paciente
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }

}

export const postPacientes = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const paciente = await Paciente.bulkCreate(body);        
        res.json({
            Paciente
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }

}

export const putPaciente = ( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'Put Pacientes',
        id,
        body
    });

}

export const deletePaciente = ( req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Delete Pacientes',
        id
    });

}