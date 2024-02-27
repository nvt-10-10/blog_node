import Comment from "../models/entity/Comment.js";
import Like from "../models/entity/Like.js";
import Post from "../models/entity/Post.js";
import User from "../models/entity/User.js";
import ResponseHandler from "./ResponseHandler.js";

async function postExists(postId, res) {
    const post = await Post.findByPk(postId);
    if (!post) {
        ResponseHandler.error(res, "Không tìm thấy bài viết", 404);
        return false;
    }
    return true;
}

async function userExists(userId, res) {
    const user = await User.findByPk(userId);
    if (!user) {
        ResponseHandler.error(res, "Không tìm thấy người dùng", 404);
        return false;
    }
    return true;
}

async function commentExists(commentId, res) {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
        ResponseHandler.error(res, "Không tìm thấy bình luận", 404);
        return false;
    }
    return true;
}

async function likeExists(likeId, res) {
    const like = await Like.findByPk(likeId);
    if (!comment) {
        ResponseHandler.error(res, "Không tìm thấy thích", 404);
        return false;
    }
    return true;
}

async function postAndUserExists(post_id, user_id, res) {
    try {
        let result = await postExists(post_id, res);
        if (!result) return false;
        result = await userExists(user_id, res);
        if (!result) return false;
        return true;
    } catch (error) {
        ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
    }
}

export { userExists, postExists, commentExists, likeExists, postAndUserExists };
