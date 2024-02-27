import jwt from "jsonwebtoken";
import config from "../config/jwtConfig.js";

function generateToken(payload) {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
    });
}

export default { generateToken };
