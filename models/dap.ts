import { DataTypes } from "sequelize";
import db from "../db/connection";

const Dap = db.define('Dap', {
    idSolicitud:{
        type: DataTypes.INTEGER
    },
    idPaciente:{
        type: DataTypes.INTEGER
    },
    estado:{
        type: DataTypes.INTEGER
    },
});

export default Dap;