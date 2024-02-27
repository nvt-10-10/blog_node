import Like from "../models/entity/Like.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import GenericService from "./genericService.js";
import {
    commentExists,
    likeExists,
    postExists,
    userExists,
} from "../utils/modelExists.js";
import likeRespository from "../repositories/likeRespository.js";
class LikeService extends GenericService {
    constructor() {
        super(Like);
    }
    async createLike(LikeData, res) {
        try {
            if (!userExists(LikeData.user_id, res)) return;
            if (
                (LikeData.type == "post" && !postExists(LikeData.object_id)) ||
                (LikeData.type == "comment" &&
                    !commentExists(LikeData.object_id))
            ) {
                ResponseHandler.error(res, "Khong ton tai");
            } else {
                const { id } = await this.create(LikeData);
                ResponseHandler.success(res, "Tao like thanh cong", { id: id });
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async deleteLike(object_id, type, user_id, res) {
        try {
            const like = await likeRespository.getLikeByObjectIdAndType(
                object_id,
                type,
                user_id
            );
            if (!like) {
                ResponseHandler.error(res, "Khong ton tai");
            } else {
                await this.delete(like.id, res);
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
}
export default new LikeService();
