import { DataType, DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Funcionario from "./funcionario";
import tripulacionTurno from "./tripulacionTurno";

const Turno = db.define('Turno', {
    responsable:{
        type: DataTypes.INTEGER,
        references:{
            model: Funcionario,
            key: 'id'
        }
    },
    estadoId:{
        type: DataTypes.INTEGER
    }
});

Turno.belongsTo(Funcionario, { foreignKey: 'responsable' });
Turno.hasMany(tripulacionTurno, { foreignKey: 'idTurno' });

export default Turno;