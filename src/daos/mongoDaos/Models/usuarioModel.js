import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        maxLength: 100,
        required: true,
    },
    telefono: {
        type: String,
        maxLength: 20,
    },
    email: {
        type: String,
        maxLength: 150,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        maxLength: 200,
        required: true,
    }
})

export const usuarioModel = mongoose.model("usuarios", UsuarioSchema);