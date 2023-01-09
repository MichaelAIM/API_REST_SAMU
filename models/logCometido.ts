import { DataTypes } from "sequelize";
import db from "../db/connection";
import Cometido from "./cometido";
import Funcionario from "./funcionario";

const logCometidos = db.define('logCometido', {
    idCometido:{
        type: DataTypes.INTEGER
    },
    estado:{
        type: DataTypes.INTEGER
    },
    idFuncionario:{
        type: DataTypes.INTEGER
    }
});

logCometidos.belongsTo(Funcionario, { foreignKey: 'idFuncionario' });
logCometidos.belongsTo(Cometido, { foreignKey: '	idCometido' });

export default logCometidos;