import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = (req: Request, res: Response, next:any) =>{
    const token:any = req.header('x-token');
    
    if ( !token || token == 'null' ) {
        return res.status(404).json({
            msg: 'No hay token en la petición'
        });
    }else{
        try {
            const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '');
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'Token no válido'
            });        
        }
    }
}