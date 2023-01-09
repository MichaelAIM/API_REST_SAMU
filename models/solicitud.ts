import { DataType, DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Cometido from "./cometido";
import Estado from './estado';
import Qtr from "./qtrs";

const Solicitud = db.define('Solicitud', {
    tipo_llamada:{
        type: DataTypes.INTEGER
    },
    telefono:{
        type: DataTypes.INTEGER
    },
    origen:{
        type: DataTypes.INTEGER
    },
    estadoId:{
        type: DataTypes.INTEGER,
        references:{
            model: Estado,
            key: 'id'
        }
    },
    lugar:{
        type: DataTypes.STRING
    },
    contacto:{
        type: DataTypes.STRING
    },
    n_paciente:{
        type: DataTypes.INTEGER
    },
    referencia:{
        type: DataTypes.STRING
    },
    motivo:{
        type: DataTypes.TEXT('medium')
    },
    motivo_cierre:{
        type: DataTypes.TEXT('medium')
    },
    resp_crea:{
        type: DataTypes.INTEGER
    },
    resp_cierra:{
        type: DataTypes.INTEGER
    },
    edad_paciente:{
        type: DataTypes.INTEGER
    },
    nom_paciente:{
        type: DataTypes.TEXT('medium')
    },
    diabetico:{
        type: DataTypes.BOOLEAN
    },
    hipertenso:{
        type: DataTypes.BOOLEAN
    },
    postrado:{
        type: DataTypes.BOOLEAN
    },
    epileptico:{
        type: DataTypes.BOOLEAN
    }
});

Solicitud.belongsTo(Estado, { foreignKey: 'estadoId' });
Solicitud.hasMany(Qtr, { foreignKey: 'idSolicitud' });
Solicitud.hasMany(Cometido, { foreignKey: 'idSolicitud' });

export default Solicitud;
