import { DataTypes } from "sequelize";
import sequelize from "../../config/DbConfig.js";
import User from "./User.js";
import { handleAfterCreate, handleBeforeDestroy } from "../hooks/likeHook.js";

const Like = sequelize.define("like", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
    },
    object_id: {
        type: DataTypes.INTEGER,
    },
});
Like.afterCreate(handleAfterCreate);
Like.beforeDestroy(handleBeforeDestroy);
User.hasMany(Like, { as: "likes", foreignKey: "user_id" });
Like.belongsTo(User, { foreignKey: "user_id" });
(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();

export default Like;
