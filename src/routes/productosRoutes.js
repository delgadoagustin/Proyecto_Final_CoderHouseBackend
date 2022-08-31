import express from "express";
import { productosController } from "../controllers/productosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const productosRoutes = express.Router();

productosRoutes.get("/",authMiddleware.checkAuthenticatedJWT, productosController.obtenerTodosLosProductos);
productosRoutes.post("/", authMiddleware.checkAuthenticatedJWT, productosController.agregarProducto);
productosRoutes.get("/categoria/:categoria", authMiddleware.checkAuthenticatedJWT, productosController.obtenerProductosPorCategoria);
productosRoutes.get("/:id", authMiddleware.checkAuthenticatedJWT, productosController.obtenerProductosPorId);

export { productosRoutes };
