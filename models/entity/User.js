import { DataTypes } from "sequelize";
import sequelize from "../../config/DbConfig.js";

const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        date_of_birth: {
            type: DataTypes.DATE,
        },
        img: {
            type: DataTypes.STRING,
            defaultValue:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
        },
    },
    {
        scopes: {
            base: {
                attributes: ["id", "name", "img"],
            },
        },
    }
);

(async () => {
    await sequelize.sync();
})();
export default User;
