import { DataTypes, ForeignKey, Model } from "sequelize";
import sequelize from "../../config/sequelize";
import User from "./User";

export default class Product extends Model {}

Product.init(
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnailUrls: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publish_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Product", // We need to choose the model name
    }
);

Product.belongsTo(User);
