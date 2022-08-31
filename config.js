import { config } from "dotenv"

config()

export default {
    //SETUP
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 8080,
    //BASE DE DATOS
    MONGOURL: process.env.MONGOURL || "",
    //NODEMAILER
    NODEMAILER_NAME: process.env.NODEMAILER_NAME||"YO",
    NODEMAILER_PORT: process.env.NODEMAILER_PORT|| 587,
    NODEMAILER_HOST: process.env.NODEMAILER_HOST||"smtp.ethereal.email",
    NODEMAILER_USER: process.env.NODEMAILER_USER||"",
    NODEMAILER_PASS: process.env.NODEMAILER_PASS||"",
    //NODEMAILER OPTIONS
    NODEMAILER_FROM: process.env.NODEMAILER_FROM||"APLICACION PRUEBA",
    NODEMAILER_SUBJECT: process.env.NODEMAILER_FROM||"ASUNTO",
    //JWT
    JWT_SECRET: process.env.JWT_SECRET||"secreto",
    //BCRYPT
    SALT_ROUNDS: process.env.SALT_ROUNDS||10,
    //SESSION
    TTL: process.env.TTL||60
}