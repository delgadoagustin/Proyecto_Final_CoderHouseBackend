import express from "express";
import { carritosController } from "../controllers/carritosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const carritosRoutes = express.Router();

carritosRoutes.get("/carrito", authMiddleware.checkAuthenticatedJWT, carritosController.obtenerCarritoPorEmail);
carritosRoutes.post("/carrito", authMiddleware.checkAuthenticatedJWT, carritosController.agregarProductoACarrito);
carritosRoutes.delete("/carrito:id", authMiddleware.checkAuthenticatedJWT, carritosController.eliminarProductoPorId );
carritosRoutes.get("/carrito/finalizar",authMiddleware.checkAuthenticatedJWT, carritosController.finalizarCompra);


export { carritosRoutes };
