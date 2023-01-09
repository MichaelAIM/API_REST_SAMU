import { Request, Response } from "express";
import Dap from "../models/dap";


export const getDaps = async( req: Request, res: Response) => {
    const daps = await Dap.findAll();
    res.json({
        daps
    });
}

export const getDap= async( req: Request, res: Response) => {
    const { id } = req.params;
    const dap = await Dap.findByPk( id );
    if( dap ){
        res.json({
            dap
        });
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id = ${ id }`
        });
    }
}

export const postDap = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const dap = await Dap.create(body);        
        res.json({
            Dap
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }

}

export const postDaps = async( req: Request, res: Response) => {
    const { body } = req;
    try {
        const dap = await Dap.bulkCreate(body);        
        res.json({
            Dap
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }

}

export const putDap = ( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'Put Daps',
        id,
        body
    });

}

export const deleteDap = ( req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Delete Daps',
        id
    });

}