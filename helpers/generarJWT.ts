import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '') => {
    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn:'12h'
        },( err, token ) =>{
            if(err){
                console.log(err);
                reject('No se puso generar el token');
            }else{
                resolve(token);
            }
        });
    });
}