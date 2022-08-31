import mongoose from "mongoose";

const MensajeSchema = new mongoose.Schema({
    email: {
        type: String,
        maxLength: 150,
        required: true,
    },
    fechaYHora: {
        type: Date,
        required: true,
    },
    cuerpo: {
        type: String,
        required: true,
    }
})

export const mensajeModel = mongoose.model("mensajes", MensajeSchema);