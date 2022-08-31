import bcrypt from "bcrypt";
import config from "../../../config.js";

export const bcrypt_functions = {
    createHash: async (password) => {
        const saltRounds = 10;
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            console.log(error)
        }
    },
    checkPass: async(password, hash) => {
        return await bcrypt.compare(password,hash)
    }
}