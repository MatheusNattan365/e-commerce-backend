import { Sequelize, DataTypes, Model } from "sequelize";
import { User as IUser } from "types/User";
const sequelize = new Sequelize("sqlite::memory:");

class User extends Model<IUser> {}

User.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnailUrl: {
            type: DataTypes.STRING,
            // allowNull defaults to true
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
        paranoid: true,
    }
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true
