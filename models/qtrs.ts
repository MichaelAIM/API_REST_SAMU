import { DataType, DataTypes, Model, Op } from "sequelize";
import db from "../db/connection";
import Estado from './estado';

const Qtr = db.define('Qtr', {
    numero:{
        type: DataTypes.INTEGER
    },
    idSolicitud:{
        type: DataTypes.INTEGER
    },
    idCometido:{
        type: DataTypes.INTEGER
    },
    estadoId:{
        type: DataTypes.INTEGER,
        references:{
            model: Estado,
            key: 'id'
        }
    }
});

Qtr.belongsTo(Estado, { foreignKey: 'estadoId' });

export default Qtr;