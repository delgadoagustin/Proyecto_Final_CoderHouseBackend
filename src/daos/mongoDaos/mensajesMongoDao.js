import { mensajeModel } from "./Models/mensajeModel.js";

export class mensajesMongoDao {
    constructor(){
        this.collection = mensajeModel;
    }

    async addOne(mensaje){
        const nuevo = new this.collection(mensaje);
        return await nuevo.save();
    }

    async count(){
        const count = await this.collection.estimatedDocumentCount();
        return count;
    }

    async getAll(){
        return await this.collection.find({});
    }

    getByEmail(email){
        return this.collection.findOne({email: email});
    }
}