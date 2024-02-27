import Like from "../models/entity/Like.js";

class LikeRepository {
    async getLikeByObjectIdAndType(object_id, type, user_id) {
        return await Like.findOne({
            where: {
                object_id,
                type,
                user_id,
            },
        });
    }
}

export default new LikeRepository();
