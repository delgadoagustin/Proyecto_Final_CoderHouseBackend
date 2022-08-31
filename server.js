//----------IMPORTS---------

import config from "./config.js";

import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//Socket

import { Server } from 'socket.io';
import { socketManager } from "./src/listeners/socketManager.js";

//TEMPLATE

import handlebars from "express-handlebars";

//SESSION

import session from "express-session";
import MongoStore from "connect-mongo";

//ROUTES

import { productosRoutes } from "./src/routes/productosRoutes.js";
import { usuariosRoutes } from "./src/routes/usuariosRoutes.js";
import { carritosRoutes } from "./src/routes/carritosRoutes.js";
import { mensajesRoutes } from "./src/routes/mensajesRoutes.js";

//-------------------------
//----------SETUP---------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = config.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//----------SESSION---------

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoURL,
        autoRemove: 'native',
        ttl: config.TTL
    }),
    secret: config.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}));

//-------------------------
//MOTOR DE PLANTILLAS
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    layoutsDir: __dirname + '/src/views/layout'
}));
app.set('view engine','hbs');
app.set('views',path.resolve(__dirname,'./src/views'));

server.listen(port, ()=>{
    console.log(`Corriendo en http://localhost:${port}`);
})

//CONFIGURACION PARA HABILITAR LA SESION Y GUARDAR EL TOKEN PARA VALIDAR
socketManager(io, session({
    store: MongoStore.create({
        mongoUrl: config.mongoURL,
        autoRemove: 'native',
        ttl: config.TTL
    }),
    secret: config.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}));

//RUTAS
app.use("/productos",productosRoutes);
app.use(usuariosRoutes);
app.use(carritosRoutes);
app.use(mensajesRoutes);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

//-------------------------


