import { DataTypes } from "sequelize";
import db from "../db/connection";
import Cometido from "./cometido";
import logAmbulancias from './logAmbulancia';

const Ambulancia = db.define('Ambulancias', {
    movil:{
        type: DataTypes.INTEGER
    },
    estado:{
        type: DataTypes.INTEGER
    },
    patente:{
        type: DataTypes.STRING
    },
    despacho:{
        type: DataTypes.INTEGER
    },
    tipo:{
        type: DataTypes.INTEGER
    }
});

Ambulancia.hasMany(Cometido, { foreignKey: 'idAmbulancia'});


Ambulancia.hasMany(logAmbulancias, { foreignKey: 'idAmbulancia' });

export default Ambulancia;