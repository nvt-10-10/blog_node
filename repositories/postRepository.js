import { QueryTypes, Sequelize } from "sequelize";
import sequelize from "../config/DbConfig.js";
import Post from "../models/entity/Post.js";

class postRepository {
    async getAllPostsByUserId(user_id, post_id, page = 0) {
        return Post.scope("base").findAll({
            where: {
                user_id: user_id,
                id: {
                    [Sequelize.Op.not]: post_id,
                },
            },
            limit: 10,
            offset: page * 10 - 1 > 0 ? page * 10 - 1 : 0,
        });
    }

    async getPostDetailById(post_id) {
        const result = await sequelize.query(
            `SELECT p.id,p.title,p.content,p.count_comment,p.count_view,p.count_like,p.createdAt, p.user_id,u.img,u.name
            ,GROUP_CONCAT(l.user_id)  as users_like from posts p
            Join users u on u.id = p.user_id
            LEFT JOIN likes l on l.object_id=:post_id and l.type='post'
                        WHERE p.id=:post_id GROUP BY p.id,u.id`,
            {
                replacements: {
                    post_id: post_id,
                },
                type: QueryTypes.SELECT,
            }
        );
        return result[0];
    }
}
export default new postRepository();
