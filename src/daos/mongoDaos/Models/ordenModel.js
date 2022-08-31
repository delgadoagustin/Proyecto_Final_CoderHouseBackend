import mongoose from "mongoose";
import { ProductoSchema } from "./productoModel.js";

const OrdenSchema = new mongoose.Schema({
    email: {
        type: String,
        maxLength: 150,
        required: true,
    },
    fechaYHora: {
        type: Date,
        required: true,
    },
    numeroOrden: {
        type: Number,
        required: true,
    },
    productos: [
        {
            producto: ProductoSchema,
            cantidad: {type: Number, default: 1}
        }
    ],
    estado: {
        type: String,
        required: true,
        default: "Generada"
    },
    direccion: {
        type: String,
        maxLength: 150,
        default: "Sin Direccion"
        //required: true,
    }
})

export const ordenModel = mongoose.model("ordenes", OrdenSchema);