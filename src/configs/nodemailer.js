import { createTransport } from "nodemailer";
import config from "../../config.js";

export const transporter = createTransport({
    name: config.NODEMAILER_NAME,
    host: config.NODEMAILER_HOST,
    port: config.NODEMAILER_PORT,
    auth: {
        user: config.NODEMAILER_USER,
        pass: config.NODEMAILER_PASS
    }
})
