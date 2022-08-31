import express from "express";
import { usuariosController } from "../controllers/usuariosController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const usuariosRoutes = express.Router();

usuariosRoutes.get("/",authMiddleware.checkLoggedInView)
usuariosRoutes.get("/register", authMiddleware.checkLoggedIn, usuariosController.vistaRegistro);
usuariosRoutes.post("/register", authMiddleware.checkLoggedIn, usuariosController.registro);
usuariosRoutes.get("/login", authMiddleware.checkLoggedIn, usuariosController.vistaLogin);
usuariosRoutes.post("/login", authMiddleware.checkLoggedIn, usuariosController.login);
usuariosRoutes.get("/logout", authMiddleware.checkAuthenticatedJWT, usuariosController.logout)

export { usuariosRoutes };