import Comment from "../models/entity/Comment.js";
import Post from "../models/entity/Post.js";
import postRepository from "../repositories/postRepository.js";
import GenericService from "./genericService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { postExists, userExists } from "../utils/modelExists.js";
class PostService extends GenericService {
    constructor() {
        super(Post);
    }

    async getAllPostByPage(page, res) {
        try {
            const result = await Post.scope(["base"]).findAll({
                order: [["createdAt", "desc"]],
                limit: 10,
                offset: page * 10 - 1 > 0 ? page * 10 - 1 : 0,
            });
            ResponseHandler.success(res, "lay du lieu thanh cong", result);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getPostDetailById(id, res) {
        try {
            if (await postExists(id, res)) {
                await Post.increment("count_view", { where: { id } });
                const result = await postRepository.getPostDetailById(id);
                return ResponseHandler.success(
                    res,
                    "lay du lieu bai viet thanh cong",
                    await this.formatJson(result)
                );
            }
        } catch (error) {
            return ResponseHandler.error(res, "Internal Server Error");
        }
    }
    async createPost(PostData, res) {
        try {
            if (await userExists(PostData.user_id, res)) {
                await this.create(PostData, res);
                ResponseHandler.success(res, "Tạo thành công bài viết");
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
    async updatePost(id, PostData, res) {
        try {
            if (await postExists(id, res)) {
                await this.update(id, PostData);
                ResponseHandler.success(res, "Cập nhật thành công bài viết");
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
    async deletePost(id, res) {
        try {
            if (await postExists(id, res)) {
                await Comment.destroy({
                    where: {
                        post_id: id,
                    },
                });
                await this.delete(id, res);
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getAllPostsByUserId(user_id, post_id, page, res) {
        try {
            if (!(await userExists(user_id, res))) return;
            if (!(await postExists(post_id, res))) return;
            const posts = await postRepository.getAllPostsByUserId(
                user_id,
                post_id
            );
            ResponseHandler.success(res, "Lay thanh cong du lieu", posts);
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async formatJson(data) {
        const result = {
            id: data.id,
            title: data.title,
            content: data.content,
            count_comment: data.count_comment,
            count_view: data.count_view,
            count_like: data.count_like,
            createdAt: data.createdAt,
            userLike: data.users_like,
            user: {
                id: data.user_id,
                name: data.name,
                img: data.img,
            },
        };
        return result;
    }
}

export default new PostService();
