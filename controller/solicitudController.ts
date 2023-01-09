import { Request, Response } from "express";
import Cometido from '../models/cometido';
import Dap from "../models/dap";
import Estado from "../models/estado";
import Funcionario from "../models/funcionario";
import Qtr from "../models/qtrs";
import Solicitud from '../models/solicitud';
import Tripulacion from "../models/tripulacion";


export const getSolicitudes = async( req: Request, res: Response) => {
    const solicitudes = await Solicitud.findAll(
        {
            include: [
                {
                    model: Estado,
                    required: true
                },
                {
                    model: Qtr,
                    required: false
                },
                {
                    model: Cometido,
                    required: false,
                    include:[
                        {
                            model: Tripulacion,
                            required: false,
                            include:[
                                {
                                    model: Funcionario,
                                    required: false
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    );
    res.json({
        solicitudes
    });
}

export const getSolicitudesDisponibles = async( req: Request, res: Response) => {
    const solicitudes = await Solicitud.findAll(
        {
            where: {
                estadoId: 1
            },
            include: [
                {
                    model: Estado,
                    required: true
                },
                {
                    model: Qtr,
                    required: false
                },
                {
                    model: Cometido,
                    required: false,
                    where: {
                        estado: 1
                    },
                    include:[
                        {
                            model: Tripulacion,
                            required: false,
                            include:[
                                {
                                    model: Funcionario,
                                    required: false
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    );
    res.json({
        solicitudes
    });
}

export const getSolicitud = async( req: Request, res: Response) => {
    const { id } = req.params;
    const solicitud = await Solicitud.findOne( 
        {
            where: {
                id: id,
                estadoId: 1
            },
            include: [
                {
                    model: Estado,
                    required: true
                },
                {
                    model: Qtr,
                    required: false
                },
                {
                    model: Cometido,
                    required: false,
                    where: {
                        estado: 1
                    },
                    include:[
                        {
                            model: Tripulacion,
                            required: false,
                            include:[
                                {
                                    model: Funcionario,
                                    required: false
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    );
    if( solicitud ){
        res.json({
            solicitud
        });
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id = ${ id }`
        });
    }
}

export const postSolicitud = async( req: Request, res: Response) => {
    const { body } = req;
    console.log( body );
    try {
        const solicitud = await Solicitud.create(body);
        res.json({
            solicitud
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el administrador'
        });
    }
}

export const putSolicitud = async( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {        
        const solicitud = await Solicitud.findByPk(id);
        if(!solicitud){
            return res.status(404).json({
                msg: 'No existe una solicitud con la id ' + id
            });
        }

        await solicitud.update(body);
        res.json( solicitud );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el administrador'
        });
    }

}

export const CloseSolicitud = async( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const solicitud = await Solicitud.findByPk(id);
        if(!solicitud){
            return res.status(404).json({
                msg: 'No existe una solicitud con la id ' + id
            });
        }
        if(!body.motivoCierre){
            return res.status(404).json({
                msg: 'No existe un motivo de cierre para la solicitud ' + id
            });
        }
        await solicitud.update({ estadoId: 3, motivo_cierre: body.motivoCierre, resp_cierra: body.resp});
        console.log(solicitud);
         res.json( solicitud );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el administrador'
        });
    }

}

export const deleteSolicitud = ( req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Delete Solicitudes',
        id
    });

}
