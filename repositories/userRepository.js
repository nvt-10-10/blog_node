import User from "../models/entity/User.js";

class userRepository {
    async checkUsername(username) {
        return await User.findOne({
            where: {
                username: username,
            },
        });
    }
}
export default new userRepository();
