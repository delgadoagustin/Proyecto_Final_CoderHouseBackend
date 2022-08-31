import mongoose from "mongoose";
import { ProductoSchema } from "./productoModel.js";

const CarritoSchema = new mongoose.Schema({
    email: {
        type: String,
        maxLength: 150,
        required: true,
    },
    fechaYHora: {
        type: Date,
        required: true,
    },
    productos: [
        {
            producto: ProductoSchema,
            cantidad: {type: Number, default: 1}
        }
    ],
    direccion: {
        type: String,
        maxLength: 150,
        default: "Sin Direccion"
        //required: true,
    }
})

export const carritoModel = mongoose.model("carritos", CarritoSchema);