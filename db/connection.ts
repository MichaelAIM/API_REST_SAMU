import { Sequelize } from "sequelize";

const db = new Sequelize('ap_samu_bd','root', 'serviciodesalud', {
    host: 'localhost',
    dialect: 'mysql',

});

export default db;
