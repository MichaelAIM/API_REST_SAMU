import { DataTypes } from "sequelize";
import db from "../db/connection";
import Cometido from "./cometido";

const Funcionario = db.define('Funcionario', {
    rut:{
        type: DataTypes.STRING
    },
    nombre:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.INTEGER
    },
    idRol:{
        type: DataTypes.INTEGER
    }
});

export default Funcionario;