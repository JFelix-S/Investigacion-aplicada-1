import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    String(process.env.DB_NAME),String(process.env.DB_USER),String(process.env.DB_PASSWORD), {
    host: process.env.HOST || 'localhost',
    dialect: 'mysql'
});

export default sequelize;