import postService from "../services/postService.js";

async function getAllPostByPage(req, res) {
    const page = req.params.page;
    await postService.getAllPostByPage(page, res);
}

async function getPostDetailById(req, res) {
    const postId = req.params.id;
    await postService.getPostDetailById(postId, res);
}

async function getAllPostsByUserId(req, res) {
    const userId = req.params.user_id;
    const postID = req.params.post_id;
    await postService.getAllPostsByUserId(userId, postID, 0, res);
}

async function createPost(req, res) {
    const { title, content, user_id } = req.body;
    await postService.createPost(
        {
            title,
            content,
            user_id,
        },
        res
    );
}

async function updatePost(req, res) {
    const postId = req.params.id;
    const { id, title, content, status } = req.body;
    await postService.updatePost(postId, { id, title, content, status }, res);
}

async function deletePost(req, res) {
    const postId = req.params.id;

    await postService.deletePost(postId, res);
}

export default {
    getAllPostsByUserId,
    getAllPostByPage,
    getPostDetailById,
    createPost,
    updatePost,
    deletePost,
};
