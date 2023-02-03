import { Request, Response } from "express";
import { Op } from "sequelize";
import Ambulancia from '../models/ambulancia';
import Cometido from "../models/cometido";
import Dap from "../models/dap";
import Paciente from "../models/paciente";
import Qtr from "../models/qtrs";
import Tripulacion from '../models/tripulacion';
import TripulacionTurno from "../models/tripulacionTurno";
import Turno from "../models/turno";


export const getCometidos = async( req: Request, res: Response) => {
    const cometidos = await Cometido.findAll();
    res.json({
        cometidos
    });
}

export const getCometidosDisponibles = async( req: Request, res: Response) => {
    const cometidos = await Cometido.findAll({
        where:{
            estado:1
        },
        include: [
            {
                model: Tripulacion,
                required:true
            }
        ]
    });
    res.json({
        cometidos
    });
}

export const getLogCometidosDia = async( req: Request, res: Response) => {
    let cometidos:any;
    const ultimoCometido:any = await Turno.findOne({  limit: 1, order: [ [ 'id', 'DESC' ]]}).then( async(response) => {
        if(ultimoCometido.id){
            cometidos = await Cometido.findAll(
                {
                    where:{
                        idTurno:ultimoCometido.id
                    },
                    order:[
                        ['id', 'DESC']
                    ]
                }
            ).then( function (response){
                if (response) {
                    response.map( async(e:any) => {
                        // e.dataValues.Ambulancias = [];
                        e.dataValues.Ambulancias = await Ambulancia.findByPk(e.dataValues.idAmbulancia).then(function ( amb ){
                            return amb;
                        });
                        return e;
                    });
                }
                return response;
            })
            .then( function(response) {
                return response;
            });
        }
    });    

    res.json({
        cometidos
    });

    // console.log('Cometidos',cometidos);
    

}

export const getCometido= async( req: Request, res: Response) => {
    const { id } = req.params;
    const cometido = await Cometido.findByPk( id );
    if( cometido ){
        res.json({
            cometido
        });
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id = ${ id }`
        });
    }
}

export const postCometido = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const ambulancia:any = await Ambulancia.findByPk(body.idAmbulancia);
        if (ambulancia.despacho == 1) {
            res.status(404).json({
                msg: `La ambulancia  = ${ ambulancia.id } ya tiene un cometido en curso`
            });
        }else{
            const ultimoCometido:any = await Turno.findOne({  limit: 1, order: [ [ 'id', 'DESC' ]]});    
            await ambulancia.update({ despacho: 1 });
            const paciente:any = await Paciente.create({ nombre: body.nombrePaciente });
            const dap:any = await Dap.create({ idSolicitud: body.idSolicitud, idPaciente: paciente.id });
            const cometido:any = await Cometido.create({ idSolicitud: body.idSolicitud, idDap: dap.id, idAmbulancia: body.idAmbulancia, idTurno: ultimoCometido.id });
            for (let i = 0; i < body.tripulacion.length; i++) {
                await Tripulacion.create({ idCometido: cometido.id, idFuncionario: body.tripulacion[i].idFuncionario, idTipoFuncionario: body.tripulacion[i].idTipoFuncionario, idTripTurno:body.tripulacion[i].id});
                let tripTurno:any = await TripulacionTurno.findByPk(body.tripulacion[i].id);    
                await tripTurno.update({ idEstado: null });
            }
            const qtr = await Qtr.create({ "numero": 3, "idSolicitud": body.idSolicitud, "idCometido": cometido.id });
            res.json({
                paciente,
                dap,
                cometido
            });          
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }
}

export const putCometido = ( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'Put Cometidos',
        id,
        body
    });

}

export const deleteCometido = async( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const ambulancia:any = await Ambulancia.findByPk(body.idAmbulancia);    
        await ambulancia.update({ despacho: null });
        const cometido:any = await Cometido.findByPk(id);    
        await cometido.update({ estado: body.EstadoCom, closedAt: body.fecha, closed_por: body.resp });
        const qtr:any = await Qtr.findOne({ where:{ numero:3, idCometido: id } });
        await qtr.update({ estadoId: null });
        for (let i = 0; i < body.tripulacion.length; i++) {
            let tripTurno:any = await TripulacionTurno.findByPk(body.tripulacion[i].idTripTurno); 
            await tripTurno.update({ idEstado: 1 });
        }
        res.json({
            ambulancia,
            cometido,
            qtr
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }

}
