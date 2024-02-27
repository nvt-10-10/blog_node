import { DataTypes } from "sequelize";
import sequelize from "../../config/DbConfig.js";
import User from "./User.js";
const Post = sequelize.define(
    "post",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        count_view: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        count_comment: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        count_like: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        edited: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        scopes: {
            base: {
                attributes: [
                    "id",
                    "title",
                    "count_like",
                    "count_comment",
                    "count_view",
                    "createdAt",
                ],
                include: {
                    model: User,
                    attributes: ["id", "name", "img"],
                },
            },
            details: {
                attributes: ["content"],
            },

            edit: {
                attributes: ["content", "status"],
            },
        },
    },
    {}
);

User.hasMany(Post, { as: "posts", foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

(async () => {
    await sequelize.sync();
})();

export default Post;
