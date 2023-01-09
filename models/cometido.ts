import { DataType, DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Ambulancia from "./ambulancia";
import Tripulacion from "./tripulacion";

const Cometido = db.define('Cometido', {
    idSolicitud:{
        type: DataTypes.INTEGER
    },
    idAmbulancia:{
        type: DataTypes.INTEGER
    },
    idDap:{
        type: DataTypes.INTEGER
    },
    idTurno:{
        type: DataTypes.INTEGER
    },
    estado:{
        type: DataTypes.INTEGER
    },
    closedAt:{
        type: DataTypes.DATE 
    },
    closed_por:{
        type: DataTypes.INTEGER
    }
});

Cometido.hasMany(Tripulacion, { foreignKey: 'idCometido' });

// Cometido.belongsTo(Ambulancia, { foreignKey: 'idAmbulancia', targetKey: 'id' });

export default Cometido;
