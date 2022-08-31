import { ordenModel } from "./Models/ordenModel.js";

export class ordenesMongoDao {
    constructor(){
        this.collection = ordenModel;
    }

    async addOne(orden){
        const nuevo = new this.collection(orden);
        return await nuevo.save();
    }

    async count(){
        const count = await this.collection.estimatedDocumentCount();
        return count;
    }

    getAll(){
        return this.collection.find();
    }

    getByEmail(email){
        return this.collection.findOne({email: email});
    }
}