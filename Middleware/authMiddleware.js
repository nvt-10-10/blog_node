import jwt from "jsonwebtoken";
import config from "../config/jwtConfig.js";
import ResponseHandler from "../utils/ResponseHandler.js";

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return ResponseHandler.error(res, "Cần có mã thông báo ủy quyền", 401);
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return ResponseHandler.error(res, "Mã không hợp lệ", 401);
    }
}

export default authMiddleware;
