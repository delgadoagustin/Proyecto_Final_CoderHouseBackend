import config from "../../../config.js";
import { transporter } from "../../configs/nodemailer.js";

export const sendEmail = async (email, data) => {
    const mailOptions = {
        from: config.NODEMAILER_FROM,
        to: email,
        subject: config.NODEMAILER_SUBJECT,
        text: JSON.stringify(data),
        html: "<b>Hello World</b>"
    }
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch(err){

    }
}