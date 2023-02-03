import { Request, Response } from "express";
import Cometido from "../models/cometido";
import Funcionario from "../models/funcionario";
import Tripulacion from "../models/tripulacion";

export const getTripulacionCometido = async( req: Request, res: Response) => {
    const triputacion = await Tripulacion.findAll({
        where:{
            idFuncionario: 36,
            idCometido: 4
        },
        include:[
            {
                model:Cometido,
                required:false
            }
        ]
    });
    res.json({
        triputacion
    });
}

// export const getTripulacionTurnoDisponible = async( req: Request, res: Response) => {
//     const triputacionTurno = await TripTurno.findAll({
//         include:[
//             {
//                 model:Funcionario,
//                 required:true
//             }
//         ]
//     });
//     res.json({
//         triputacionTurno
//     });
// }

// export const getTripulacionTurno = async( req: Request, res: Response) => {
//     const { id } = req.params;
//     const triputacionTurno = await TripTurno.findByPk( id );
//     if( triputacionTurno ){
//         res.json({
//             triputacionTurno
//         });
//     }else{
//         res.status(404).json({
//             msg: `No existe un usuario con el id = ${ id }`
//         });
//     }
// }

// export const postTripulacionTurno = ( req: Request, res: Response) => {
//     const { body } = req;
//     try {
//         res.json({
//             msg: 'Post Ambulancias',
//             body
//         });        
//     } catch (error) {
//         res.status(500).json({
//             msg: 'Error! hable con el administrador.'
//         });    
//     }
// }

// export const putTripulacionTurno = ( req: Request, res: Response) => {
//     const { id } = req.params;
//     const { body } = req;

//     res.json({
//         msg: 'Put Ambulancias',
//         id,
//         body
//     });

// }

// export const deleteTripulacionTurno = ( req: Request, res: Response) => {
//     const { id } = req.params;

//     res.json({
//         msg: 'Delete Ambulancias',
//         id
//     });

// }