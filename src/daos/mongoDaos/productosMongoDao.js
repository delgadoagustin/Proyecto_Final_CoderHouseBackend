import { productoModel } from "./Models/productoModel.js";

export class productosMongoDao {
    constructor(){
        this.collection = productoModel;
    }

    addOne(producto){
        const nuevo = new this.collection(producto);
        nuevo.save();
    }

    async getAll(){
        return await this.collection.find();
    }

    async getAllByCategoria(categoria){
        return await this.collection.find({categoria: categoria});
    }

    async getById(id){
        return await this.collection.findById(id);
    }
}