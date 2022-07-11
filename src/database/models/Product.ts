import { DataTypes, Model } from "sequelize";
import { BaseProduct } from "types/Product";
import sequelize from "../../config/sequelize";

export default class Product extends Model<BaseProduct> {}

Product.init(
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnailUrls: {
            type: DataTypes.ARRAY,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publish_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        createdBy: {
            type: DataTypes.NUMBER,
            references: {
                model: "User",
                key: "id",
            },
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: "Product", // We need to choose the model name
    }
);
