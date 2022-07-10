import { Sequelize, DataTypes, Model } from "sequelize";
import { Product as IProduct } from "types/Product";
const sequelize = new Sequelize("sqlite::memory:");

class Product extends Model<IProduct> {}

Product.init(
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        thumbnailUrls: {
            type: DataTypes.ARRAY,
            // allowNull defaults to true
        },
        publish_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        createdBy: {
            type: DataTypes.NUMBER,
            allowNull: false,
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
        paranoid: true,
    }
);

// the defined model is the class itself
console.log(Product === sequelize.models.Product); // true
