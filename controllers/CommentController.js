import commentService from "../services/commentService.js";

async function getAllRootCommentByPost(req, res) {
    const post_id = req.params.id;
    const page = req.params.page ? req.params.page : 0;
    await commentService.getAllRootCommentsByPostId(post_id, page, res);
}

async function getAllCommentPath(req, res) {
    const comment_id = req.params.comment_id;
    await commentService.getAllCommentPath(comment_id, 0, res);
}

async function createComment(req, res) {
    const { content, post_id, user_id } = req.body;
    await commentService.createComment(
        {
            content,
            post_id,
            user_id,
        },
        res
    );
}

async function createCommentReply(req, res) {
    const { content, post_id, user_id, comment_id } = req.body;
    await commentService.createCommentReply(
        {
            content,
            post_id,
            user_id,
            comment_id,
        },
        res
    );
}

async function updateComment(req, res) {
    const { content, comment_id, post_id, user_id } = req.body;
    await commentService.updateComment(
        comment_id,
        { content, comment_id, post_id, user_id },
        res
    );
}

async function deleteComment(req, res) {
    const commentId = req.params.id;
    try {
        await commentService.deleteComment(commentId, res);
    } catch (error) {
        console.error(error);
    }
}

export default {
    getAllRootCommentByPost,
    getAllCommentPath,
    createComment,
    createCommentReply,
    updateComment,
    deleteComment,
};
