import { DataTypes } from "sequelize";
import db from "../db/connection";
import Funcionario from "./funcionario";

const Tripulacion = db.define('tripulacionCometido', {
    idTripTurno:{
        type: DataTypes.INTEGER
    },
    idCometido:{
        type: DataTypes.INTEGER
    },
    idFuncionario:{
        type: DataTypes.INTEGER
    },
    idTipoFuncionario:{
        type: DataTypes.INTEGER
    },

});

Tripulacion.belongsTo(Funcionario, { foreignKey: 'idFuncionario' });

export default Tripulacion;