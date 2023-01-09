import { DataTypes } from "sequelize";
import db from "../db/connection";
import Ambulancia from "./ambulancia";
import Funcionario from "./funcionario";

const logAmbulancias = db.define('logAmbulancias', {
    idAmbulancia:{
        type: DataTypes.INTEGER
    },
    estado:{
        type: DataTypes.INTEGER
    },
    idFuncionario:{
        type: DataTypes.INTEGER
    },
    motivo:{
        type: DataTypes.TEXT('medium')
    },
});

logAmbulancias.belongsTo(Funcionario, { foreignKey: 'idFuncionario' });
// logAmbulancias.belongsTo(Ambulancia, { foreignKey: 'idAmbulancia' });

export default logAmbulancias;