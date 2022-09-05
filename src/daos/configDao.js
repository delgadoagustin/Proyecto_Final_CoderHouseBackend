import config from "./../../config.js"
//MEMORY

import { productosMemoryDao } from "./memoryDaos/productosMemoryDao.js";
import { usuariosMemoryDao } from "./memoryDaos/usuariosMemoryDao.js";
import { carritosMemoryDao } from "./memoryDaos/carritosMemoryDao.js";

//MONGODB
import mongoose from "mongoose";
import { productosMongoDao } from "./mongoDaos/productosMongoDao.js";
import { usuariosMongoDao } from "./mongoDaos/usuariosMongoDao.js";
import { carritosMongoDao } from "./mongoDaos/carritosMongoDao.js";
import { ordenesMongoDao } from "./mongoDaos/ordenesMongoDao.js";
import { mensajesMongoDao } from "./mongoDaos/mensajesMongoDao.js"

let type = "mongo"; //Utilizado para gestionar daos

let Dao
switch (type) {
    case "memory":
        Dao = {
            productos: new productosMemoryDao(),
            usuarios: new usuariosMemoryDao(),
            carritos: new carritosMemoryDao()
        };
        break;
    case "mongo":
        try {
            mongoose.connect(
                config.MONGOURL
            );
            Dao = {
                productos: new productosMongoDao(),
                usuarios: new usuariosMongoDao(),
                carritos: new carritosMongoDao(),
                ordenes: new ordenesMongoDao(),
                mensajes: new mensajesMongoDao()
            };
            
        } catch (error) {
            Dao = {
                productos: new productosMemoryDao(),
                usuarios: new usuariosMemoryDao(),
                carritos: new carritosMemoryDao()
            };
        }

    // default:
    //     Dao = {
    //         productos: new productosMemoryDao(),
    //         usuarios: new usuariosMemoryDao(),
    //         carritos: new carritosMemoryDao()
    //     };
    //     break;
}

export { Dao };


