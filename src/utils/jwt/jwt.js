import jwt from "jsonwebtoken";
import config from "../../../config.js";

export const getToken = (user) => {
    return jwt.sign(user, config.JWT_SECRET, {expiresIn: 60*60})
}