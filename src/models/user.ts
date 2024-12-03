import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Asegúrate de importar correctamente tu instancia de sequelize

export class User extends Model {
    public userName!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize, // Asegúrate de que sequelize esté correctamente configurado
        modelName: 'User'
    }
);