import userService from "../services/userService.js";
import ResponseHandler from "../utils/ResponseHandler.js";

async function getUserById(req, res) {
    const userId = req.params.id;
    try {
        return userService.getUserByIdAndRespond(userId, res);
    } catch (error) {
        console.error(error);
        return ResponseHandler.error(res, "Lỗi máy chủ nội bộ");
    }
}

async function createUser(req, res) {
    const { username, password, name } = req.body;
    return await userService.createUser(
        {
            username,
            password,
            name,
        },
        res
    );
}

async function updateUser(req, res) {
    const { id, password, name, email, address, date_of_birth, img } = req.body;

    await userService.updateUser(
        { id, password, name, email, address, date_of_birth, img },
        res
    );
}

export default {
    getUserById,
    createUser,
    updateUser,
};
