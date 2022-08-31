import mongoose from "mongoose";

export const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxLength: 100,
    },
    descripcion: {
        type: String,
        required: true,
        maxLength: 200,
    },
    categoria: {
        type: String,
        required: true,
        maxLength: 50
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    imagen: {
        type: String,
        required: false,
    }
})

export const productoModel = mongoose.model("productos",ProductoSchema);