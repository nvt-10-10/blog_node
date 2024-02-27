import { DataTypes } from "sequelize";
import sequelize from "../../config/DbConfig.js";
import User from "./User.js";
import Post from "./Post.js";
import {
    handleAfterCreate,
    handleBeforeDestroy,
} from "../hooks/commentHooks.js";

const Comment = sequelize.define(
    "comment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        count_comment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        count_like: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        parent: {
            type: DataTypes.STRING,
            defaultValue: "",
        },
        path: {
            type: DataTypes.STRING,
        },
        edited: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        scopes: {
            base: {
                attributes: ["id", "content"],
            },
            detail: {
                attributes: ["count_comment", "count_like", "edited"],
            },

            path: {
                attributes: ["path"],
            },
        },
    }
);
Comment.afterCreate(handleAfterCreate);
Comment.beforeDestroy(handleBeforeDestroy);

User.hasMany(Comment, { as: "comments", foreignKey: "user_id" });
Post.hasMany(Comment, { as: "posts", foreignKey: "post_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });
(async () => {
    await sequelize.sync();
})();

export default Comment;
