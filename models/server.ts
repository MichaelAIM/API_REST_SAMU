import express, { Application } from 'express'
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import db from '../db/connection';
import solicitudRoutes from '../routes/solicitud';
import ambulanciaRoutes from '../routes/ambulancia';
import tripTurnoRoutes from '../routes/tripulacionTurno';
import turnoRoutes from '../routes/turno';
import qtrRoutes from '../routes/qtrs';
import cometidoRoutes from '../routes/cometido';
import dapRoutes from '../routes/dap';
import pacienteRoutes from '../routes/paciente';
import funcionarioRoutes from '../routes/funcionario';
import authRoutes from '../routes/auth';
import Tripulacion from '../routes/tripulacionCometido';

class Server {
    private app: Application;
    private appServ;
    private port:string;
    private apiPaths = {
        solicitudes        : '/api/solicitud',
        cometidos          : '/api/cometidos',
        ambulancias        : '/api/ambulancia',
        turno              : '/api/Turno',
        triputacionTurno   : '/api/triputacionTurno',
        dap                : '/api/daps',
        qtr                : '/api/Qtr',
        paciente           : '/api/paciente',
        Tripulacion        : '/api/Tripulacion',
        funcionario        : '/api/funcionario',
        auth               : '/api/auth'
    }

    constructor () {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.appServ = https.createServer({
            key: fs.readFileSync(process.env.KEYSSL || ''),
            cert: fs.readFileSync(process.env.CERTSSL || '')
            //Cambiar a SSL del Servidor
        },this.app);
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    routes(){
        this.app.use( this.apiPaths.solicitudes, solicitudRoutes);
        this.app.use( this.apiPaths.ambulancias, ambulanciaRoutes);
        this.app.use( this.apiPaths.qtr, qtrRoutes);
        this.app.use( this.apiPaths.triputacionTurno, tripTurnoRoutes);
        this.app.use( this.apiPaths.turno, turnoRoutes);
        this.app.use( this.apiPaths.cometidos, cometidoRoutes);
        this.app.use( this.apiPaths.dap, dapRoutes);
        this.app.use( this.apiPaths.paciente, pacienteRoutes);
        this.app.use( this.apiPaths.funcionario, funcionarioRoutes);
        this.app.use( this.apiPaths.Tripulacion, Tripulacion);
        this.app.use( this.apiPaths.auth, authRoutes);
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log("base de datos en linea");
        } catch (error:any) {
            throw new Error( error );            
        }
    }

    middlewares(){
        //CORS
        this.app.use( cors() );
        //Lectura del Body
        this.app.use( express.json() );
        //carpeta Public
        this.app.use( express.static('public') );
    }

    listen(){
        this.appServ.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port );
        });
    }
}

export default Server;
