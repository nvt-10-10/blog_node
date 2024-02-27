import authService from "../services/authService.js";
import User from "../models/entity/User.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { comparePassword } from "../utils/bcryptUtils.js";

async function login(req, res) {
    try {
        const { username, password } = req.body;
        if (!username) {
            ResponseHandler.error(res, "Khong co usernamee", 500);
            return;
        }
        const user = await User.findOne({
            where: { username },
        });

        if (!(await comparePassword(password, user ? user?.password : ""))) {
            ResponseHandler.error(
                res,
                "tai khoan hoac mat khau khong dung",
                401
            );
            return;
        }
        const token = authService.generateToken({ userId: user.id });
        const data = {
            name: user.name,
            img: user.img,
            id: user.id,
        };
        ResponseHandler.success(res, "Login successful", {
            user: data,
            token,
        });
    } catch (error) {
        console.error(error);
        return ResponseHandler.error(res, "Internal Server Error", 500);
    }
}

export default { login };
