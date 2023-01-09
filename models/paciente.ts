import { DataTypes } from "sequelize";
import db from "../db/connection";
import Dap from "./dap";


const Paciente = db.define('Paciente', {
    nombre:{
        type: DataTypes.STRING
    },
    rut:{
        type: DataTypes.STRING
    },
    prevision:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.INTEGER
    }
});
Paciente.hasMany(Dap, { foreignKey: 'idPaciente' });

export default Paciente;