import likeService from "../services/likeService.js";

async function createLike(req, res) {
    const { user_id, object_id, type } = req.body;
    await likeService.createLike({ user_id, object_id, type }, res);
}

async function deleteLike(req, res) {
    const object_id = req.params.object_id;
    const type = req.params.type;
    const user_id = req.params.user_id;
    await likeService.deleteLike(object_id, type, user_id, res);
}

export default { createLike, deleteLike };
