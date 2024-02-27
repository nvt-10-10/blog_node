import Comment from "../entity/Comment.js";
import Post from "../entity/Post.js";

const handleAfterCreate = async (like) => {
    if (like.type === "comment")
        await Comment.increment("count_like", {
            where: { id: like.object_id },
        });
    else if (like.type === "post")
        await Post.increment("count_like", { where: { id: like.object_id } });
};

const handleBeforeDestroy = async (like) => {
    if (like.type === "comment")
        await Comment.decrement("count_like", {
            where: { id: like.object_id },
        });
    else if (like.type === "post")
        await Post.decrement("count_like", { where: { id: like.object_id } });
};
export { handleAfterCreate, handleBeforeDestroy };
