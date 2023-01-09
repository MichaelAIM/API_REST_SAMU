import { DataType, DataTypes } from "sequelize";
import db from "../db/connection";

const Estado = db.define('Estado', { estado: DataTypes.STRING });

export default Estado;