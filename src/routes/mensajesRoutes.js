import express from "express";
import { mensajesController } from "../controllers/mensajesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const mensajesRoutes = express.Router()

mensajesRoutes.get("/chat",authMiddleware.checkAuthenticatedJWT, mensajesController.vista);

export {mensajesRoutes};