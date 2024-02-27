import ResponseHandler from "../../utils/ResponseHandler.js";
import Comment from "../entity/Comment.js";
import Like from "../entity/Like.js";
import Post from "../entity/Post.js";

import { literal, Sequelize } from "sequelize";

const handleAfterCreate = async (comment) => {
    if (comment.path == null) {
        comment.path = comment.id.toString();
    } else {
        comment.path = comment.path + "_" + comment.id.toString();
        Comment.increment("count_comment", { where: { id: comment.parent } });
    }

    await Post.increment("count_comment", { where: { id: comment.post_id } });
    await comment.save();
};

const handleBeforeDestroy = async (comment) => {
    try {
        const size = comment.count_comment + 1;

        await Post.update(
            { count_comment: literal(`count_comment - ${size}`) },
            { where: { id: comment.post_id } }
        );

        await Like.destroy({
            where: { object_id: comment.id, type: "comment" },
        });

        if (comment.parent != null) {
            const arrParent = comment.path.split("_");
            arrParent.pop();
            for (const element of arrParent) {
                await Comment.update(
                    { count_comment: literal(`count_comment - ${size}`) },
                    { where: { id: element } }
                );
            }
        }
        if (comment.id != comment.path) {
            await Comment.destroy({
                where: { path: { [Sequelize.Op.like]: `${comment.path}%` } },
            });
        }
        if (comment.parent != null) {
            const arrParent = comment.parent.split("_");
            arrParent.pop();
            for (const element of arrParent) {
                await Comment.update(
                    { count_comment: literal(`count_comment - ${size}`) },
                    { where: { id: element } }
                );
            }
        }
    } catch (error) {
        ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
    }
};
export { handleAfterCreate, handleBeforeDestroy };
