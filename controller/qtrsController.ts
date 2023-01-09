import { Request, Response } from "express";
import { Op } from "sequelize";

import Qtr from "../models/qtrs";


export const getQtrs = async( req: Request, res: Response) => {
    const Qtrs = await Qtr.findAll();
    res.json({
        Qtrs
    });
}

export const getQtrsCometido = async( req: Request, res: Response) => {
    const { id } = req.params;
    const qtr:any = await Qtr.findAll({
        where:{
            idSolicitud : id,
            numero: {
                [Op.lt]:3,
            },
            estadoId:1  
        }
    });
    const qCom:any = await Qtr.findAll({
        where:{
            idCometido : req.body.idCometido,
            estadoId:1  
        }
    });

    const Qtrs = [];
    for (let index = 0; index < qtr.length; index++) {
        Qtrs.push(qtr[index]);
    }
    for (let index = 0; index < qCom.length; index++) {
        Qtrs.push(qCom[index]);
    }
    res.json({
        Qtrs
        // qtr,qCom
    });
}

export const getQtr= async( req: Request, res: Response) => {
    const { id } = req.params;
    const qtr = await Qtr.findByPk( id );
    if( qtr ){
        res.json({
            qtr
        });
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id = ${ id }`
        });
    }
}

export const postQtr = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const qtr = await Qtr.create(body);        
        res.json({
            qtr
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }

}

export const postQtrs = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const qtr = await Qtr.bulkCreate(body);        
        res.json({
            qtr
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }

}

export const putQtr = ( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'Put Qtrs',
        id,
        body
    });

}

export const deleteQtr = ( req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Delete Qtrs',
        id
    });

}