import QueryTypes from "sequelize";
import sequelize from "../config/DbConfig.js";
import Comment from "../models/entity/Comment.js";
class commentRepository {
    async findAllRootCommentsByPostId(post_id, page = 0) {
        try {
            const queryResult = await sequelize.query(
                "SELECT c.id, c.content, c.count_comment, c.count_like, c.createdAt,c.user_id,u.name,u.img,  IFNULL(GROUP_CONCAT(l.user_id), -1) AS userLike " +
                    "FROM comments c " +
                    "JOIN users u on c.user_id = u.id " +
                    "LEFT JOIN likes l ON l.object_id = c.id AND l.type = 'comment' " +
                    "WHERE c.post_id = :post_id AND c.path = cast(c.id as char) " +
                    "GROUP BY c.id ORDER BY c.createdAt DESC LIMIT :limit OFFSET :offset",
                {
                    replacements: {
                        post_id: post_id,
                        limit: 10,
                        offset: page * 10,
                    },
                    type: QueryTypes.SELECT,
                }
            );
            return queryResult[0];
        } catch (error) {
            throw error;
        }
    }

    async findAllCommentPath(postId, path, page) {
        try {
            const queryResult = await sequelize.query(
                `SELECT c.id, c.content, c.count_comment, c.count_like, c.createdAt,c.user_id,u.name,u.img,  IFNULL(GROUP_CONCAT(l.user_id), -1) AS userLike
                FROM comments c JOIN users u on c.user_id = u.id 
                LEFT JOIN likes l ON l.object_id = c.id AND l.type = 'comment'
                WHERE c.post_id = :postId AND c.path = CONCAT(:path, '_', c.id)
                GROUP BY c.id
                ORDER BY c.createdAt DESC
                LIMIT :limit OFFSET :offset`,
                {
                    replacements: {
                        postId: postId,
                        path: path,
                        limit: 10,
                        offset: page * 10 - 1 > 0 ? page * 10 - 1 : 0,
                    },
                    type: QueryTypes.SELECT,
                }
            );
            return queryResult[0];
        } catch (error) {
            throw error;
        }
    }

    async incrementCommentCount(comment_id) {
        try {
            Comment.increment("count_comment", { id: comment_id });
        } catch (error) {
            throw error;
        }
    }

    async incrementLikeCount(comment_id) {
        try {
            Comment.increment("count_", { id: comment_id });
        } catch (error) {
            throw error;
        }
    }

    async deleteByPath(path) {
        try {
            const deletedRows = await knex("comments")
                .whereRaw("path LIKE ?", [`${path}%`])
                .del();
            return deletedRows;
        } catch (error) {
            throw error;
        }
    }

    async getLengthRoot(post_id) {
        try {
            const countResult = await knex("comments")
                .count("id as count")
                .where("post_id", post_id)
                .andWhereRaw("path = cast(id as string)");

            const count = countResult[0].count;

            return count;
        } catch (error) {
            throw error;
        }
    }
}
export default new commentRepository();
