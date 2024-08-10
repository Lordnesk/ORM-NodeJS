import { Sequelize } from 'sequelize-typescript';
import { User } from '../entities/user.entity';
import dotenv from "dotenv";

dotenv.config();

const sequelize: Sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User], // Añade todos tus modelos aquí
});

export default sequelize;