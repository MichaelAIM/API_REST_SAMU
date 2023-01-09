import { Request, Response } from "express";
import Ambulancia from "../models/ambulancia";
import Cometido from "../models/cometido";
import Funcionario from '../models/funcionario';
import Tripulacion from "../models/tripulacion";
import tripulacionTurno from "../models/tripulacionTurno";
import logAmbulancias from '../models/logAmbulancia';
import Qtr from "../models/qtrs";

export const getAmbulancias = async( req: Request, res: Response) => {
    const ambulancias = await Ambulancia.findAll({
        include:[
            {
                model: logAmbulancias,
                required:false,
                include: [
                    {
                        model: Funcionario,
                        required: true
                    }
                ]
            }
        ]
    });
    res.json({
        ambulancias
    });
}

export const getAmbulanciasDisponible = async( req: Request, res: Response) => {
    const ambulancias = await Ambulancia.findAll({
        where: {
            estado: 1
        },
        include:[
            {
                model: Cometido,
                required:false,
                where: {
                    estado: 1
                },
                include:[
                    {
                        model: Tripulacion,
                        required: true,
                        include: [
                            {
                                model: Funcionario,
                                required: true
                            }
                        ]
                    }
                ]
            }
        ]
    });
    res.json({
        ambulancias
    });
}

export const getAllAmbulanciasDisponible = async( req: Request, res: Response) => {
    const ambulancias = await Ambulancia.findAll({
        include:[
            {
                model: Cometido,
                required:false,
                where: {
                    estado: 1
                },
                include:[
                    {
                        model: Tripulacion,
                        required: true,
                        include: [
                            {
                                model: Funcionario,
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                model: logAmbulancias,
                required:false,
                include: [
                    {
                        model: Funcionario,
                        required: true,
                    }
                ],
                limit: 1,
                order:[
                    ['id', 'DESC']
                ]
            }
        ],
        order:[
            ['estado', 'ASC']
        ]
    });
    res.json({
        ambulancias
    });
}



export const getAmbulancia = async( req: Request, res: Response) => {
    const { id } = req.params;
    const ambulancia = await Ambulancia.findByPk( id );
    if( ambulancia ){
        res.json({
            ambulancia
        });
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id = ${ id }`
        });
    }
}

export const postAmbulancia = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const ambulancia = await Ambulancia.create({ movil: body.movil, patente: body.patente}); 
        res.json({
            ambulancia
        });    
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }
}

export const putAmbulancia = async( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const ambulancia = await Ambulancia.findByPk( id );
        if( ambulancia ){
            await ambulancia.update(body);
        } 
        res.json({
            ambulancia
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        }); 
    }
}

export const putAmbulanciaEstado = async( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    let est = 1;
    if(body.motivo){
        est = 2;
    }
    const ambulancia = await Ambulancia.findByPk( id );
    if( ambulancia ){
        await ambulancia.update({estado:est});
    }
    const funcionario:any = await Funcionario.findByPk(body.resp);
    const ambLOG:any = await logAmbulancias.create({ idAmbulancia:id, estado:est, idFuncionario:body.resp, motivo:body.motivo });       
    res.json({
        ambLOG,
        funcionario
    });
}
export const deleteAmbulancia = ( req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Delete Ambulancias',
        id
    });

}
