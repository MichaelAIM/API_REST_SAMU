import { DataType, DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Funcionario from "./funcionario";

const tripulacionTurno = db.define('tripulacionTurno', {
    idTurno:{
        type: DataTypes.INTEGER
    },
    idFuncionario:{
        type: DataTypes.INTEGER,
        references:{
            model: Funcionario,
            key: 'id'
        }
    },
    idEstado:{
        type: DataTypes.INTEGER
    },
    idTipoFuncionario:{
        type: DataTypes.INTEGER
    },
    idAmbulancia:{
        type: DataTypes.INTEGER
    }
});

tripulacionTurno.belongsTo(Funcionario, { foreignKey: 'idFuncionario' });

export default tripulacionTurno;