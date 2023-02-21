import { Request, Response } from "express";
import Funcionario from "../models/funcionario";
import tripulacionTurno from "../models/tripulacionTurno";
import Turno from "../models/turno";

export const getTurnos = async( req: Request, res: Response) => {
    const Turnos = await Turno.findAll({
        include:[
            {
                model:Funcionario,
                required:true
            }
        ]
    });
    res.json({
        Turnos
    });
}

export const getTurnoDisponible = async( req: Request, res: Response) => {
    const TurnoDisponible = await Turno.findAll({
        where:{
            estadoId:1
        },
        limit:1,
        order:[
            ['id', 'DESC']
        ],
        include:[
            {
                model: tripulacionTurno,
                required: false,
                include:[
                    {
                        model:Funcionario,
                        required: true,
                    }
                ]
            }
        ]
    });
    res.json({
        TurnoDisponible
    });
}

export const getTurno = async( req: Request, res: Response) => {
    const { id } = req.params;
    const triputacionTurno = await Turno.findByPk( id );
    if( triputacionTurno ){
        res.json({
            triputacionTurno
        });
    }else{
        res.status(404).json({
            msg: `No existe un usuario con el id = ${ id }`
        });
    }
}

export const postTurno = async( req: Request, res: Response) => {
    const { body } = req;
    console.log(body);

    try {
        if(body.turnoAnterior !== undefined && body.turnoAnterior !== 'undefined'){
            const turno = await Turno.findByPk( body.turnoAnterior );
            if( turno ){
                await turno.update({estadoId:3});
            }
            // console.log(body.turnoAnterior);
        }
        const nuevoTurno:any = await Turno.create( { responsable: body.resp } );
        for (let i = 0; i < body.funcTurno.length; i++) {
            let element = await tripulacionTurno.create({idTurno:nuevoTurno.id, idFuncionario: body.funcTurno[i].idFuncionario, idTipoFuncionario: body.funcTurno[i].idTipoFuncionario, idAmbulancia: body.funcTurno[i].idAmbulancia});
        }
        res.json({
            msg: 'Post Ambulancias',
            body
        });        
    } catch (error) {
        res.status(500).json({
            msg: 'Error! hable con el administrador.'
        });    
    }
}

export const putTurno = ( req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'Put Ambulancias',
        id,
        body
    });

}

export const deleteTurno = ( req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Delete Ambulancias',
        id
    });

}
