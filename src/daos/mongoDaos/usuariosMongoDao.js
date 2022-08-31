import { usuarioModel } from "./Models/usuarioModel.js";

export class usuariosMongoDao {
    constructor(){
        this.collection = usuarioModel;
    }

    async addOne(usuario){
        const nuevo = new this.collection(usuario);
        return await nuevo.save();
    }

    async getByEmail(email, callback){
        return await this.collection.findOne({email: email},callback);
    }

    async getUser(email, password){
        return await this.collection.find({email: email, password:password})
    }

    async getById(id, callback){
        return await this.collection.findById(id,callback);
    }

    async getAll(){
        return await this.collection.find();
    }

    async existEmail(email){
        return await this.collection.exists({email: email})
    }
}