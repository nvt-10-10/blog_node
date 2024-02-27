import Comment from "../models/entity/Comment.js";
import commentRepository from "../repositories/commentRepository.js";
import GenericService from "./genericService.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import {
    postExists,
    postAndUserExists,
    commentExists,
} from "../utils/modelExists.js";
import User from "../models/entity/User.js";
class CommentService extends GenericService {
    constructor() {
        super(Comment);
    }
    async getAllRootCommentsByPostId(post_id, page, res) {
        try {
            const resultCheck = await postExists(post_id, res);
            if (resultCheck) {
                const result =
                    await commentRepository.findAllRootCommentsByPostId(
                        post_id,
                        page
                    );
                ResponseHandler.success(
                    res,
                    "Đã truy xuất bình luận của bài viết thành công",
                    {
                        comments: await this.formatJson(result),
                        length: 0,
                    }
                );
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
    async getAllCommentPath(comment_id, page = 0, res) {
        try {
            const comment = await this.getById(comment_id);
            if (!comment) {
                ResponseHandler.error(res, "Không tìm thấy bình luận", 404);
                return;
            }
            const resultCheck = await postExists(comment.post_id, res);
            if (resultCheck) {
                const result = await commentRepository.findAllCommentPath(
                    comment.post_id,
                    comment.path,
                    page
                );
                ResponseHandler.success(
                    res,
                    "Đã truy xuất bình luận của bài viết thành công",
                    {
                        comments: await this.formatJson(result),
                        length: 0,
                    }
                );
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async findAllCommentByPostID(post_id, page, res) {
        try {
            const resultCheck = postExists(post_id, res);
            if (resultCheck) {
                const result =
                    await commentRepository.findAllRootCommentsByPostId(
                        post_id,
                        page
                    );
                ResponseHandler.success(res, "", result);
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async createComment(commentData, res) {
        try {
            const resultCheck = await postAndUserExists(
                commentData.post_id,
                commentData.user_id,
                res
            );
            if (resultCheck) {
                const {
                    id,
                    content,
                    createdAt,
                    count_comment,
                    count_like,
                    user_id,
                } = await this.create(commentData);
                const user = await User.scope("base").findByPk(user_id);
                ResponseHandler.success(res, "Tao binh luan thanh cong", {
                    id,
                    content,
                    createdAt,
                    count_comment,
                    count_like,
                    user: user,
                });
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async createCommentReply(commentData, res) {
        try {
            const comment = await this.getById(commentData.comment_id);
            if (comment) {
                commentData.path = comment.path;
                commentData.parent = commentData.comment_id;
                await this.createComment(commentData, res);
            } else {
                ResponseHandler.error(res, "Binh luan cha khong ton tai");
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async updateComment(id, commentData, res) {
        id = id ? id : -1;
        try {
            const resultCheck = await commentExists(id ? id : -1, res);
            if (resultCheck) {
                await Comment.update(
                    { content: commentData.content },
                    { where: { id: id } }
                );
                ResponseHandler.success(res, "Cập nhập bình luận thành công");
            }
        } catch (error) {
            ResponseHandler.error(res, "Đã xảy ra lỗi khi tạo bình luận");
        }
    }
    async deleteComment(id, res) {
        try {
            await this.delete(id, res);
        } catch (error) {
            ResponseHandler.error(res, "Loi server");
        }
    }

    async formatJson(data) {
        const comments = data.map((item) => {
            const comment = {
                id: item.id,
                content: item.content,
                count_comment: item.count_comment,
                count_like: item.count_like,
                createdAt: item.createdAt,
                userLike: item.userLike,
            };
            if (item.user_id) {
                comment.user = {
                    id: item.user_id,
                    name: item.name,
                    img: item.img,
                };
            }

            return comment;
        });

        return comments;
    }
}

export default new CommentService();
