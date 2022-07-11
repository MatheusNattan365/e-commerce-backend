import { DataTypes, Model, Sequelize } from "sequelize";
import { BaseUser } from "types/User";
import sequelize from "../../config/sequelize";
import Product from "./Product";

export default class User extends Model<BaseUser> {}

User.init(
    {
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmedEmail: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "User", // We need to choose the model name
    }
);
