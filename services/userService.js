import User from "../models/entity/User.js";
import userRepository from "../repositories/userRepository.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { hashPassword } from "../utils/bcryptUtils.js";
import { userExists } from "../utils/modelExists.js";
import GenericService from "./genericService.js";

class UserService extends GenericService {
    constructor() {
        super(User);
    }

    async getUserById(id) {
        try {
            return await this.getById(id, "base");
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }

    async getUserByIdAndRespond(id, res) {
        const user = await this.getById(id, "base");
        if (user) {
            ResponseHandler.success(
                res,
                "Người dùng đã truy xuất thành công",
                user
            );
        } else {
            ResponseHandler.error(res, "Không tìm thấy người dùng", 404);
        }
    }
    async createUser(userData, res) {
        try {
            const user = await userRepository.checkUsername(userData.username);
            if (user == null) {
                userData.password = await hashPassword(userData.password);
                await this.create(userData);

                ResponseHandler.success(
                    res,
                    "Người dùng được tạo thành công",
                    "",
                    201
                );
            } else {
                ResponseHandler.error(res, "Tài khoản tồn tại", 409);
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
    async updateUser(id, userData, res) {
        try {
            if (userExists(id)) {
                userData.password = await hashPassword(userData.password);
                await this.update(id, userData, res);
                ResponseHandler.success(
                    res,
                    "Người dùng được tạo thành công",
                    "",
                    201
                );
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
}
export default new UserService();
