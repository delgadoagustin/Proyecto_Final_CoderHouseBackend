import { carritoModel } from "./Models/carritoModel.js";

export class carritosMongoDao {
    constructor(){
        this.collection = carritoModel;
    }

    async addOne(carrito){
        const nuevo = new this.collection(carrito);
        return await nuevo.save();

    }


    getAll(){
        return this.collection.find();
    }

    async getByEmail(email){
        return await this.collection.findOne({email: email});
    }

    async addProducto(email, producto, cantidad){
        let doc = await this.collection.findOneAndUpdate(
            {email: email}, 
            {"$push": {productos: {"producto":producto, "cantidad": cantidad}}},
            { new: true }
        );
        return doc;
    }

    async deleteProductoById(email, prodId){
        await this.collection.findOneAndUpdate(
            {email: email},
            {"$pull": {productos: {"producto._id": prodId}}}
        )
    }

    async deleteCarrito(email){
        await this.collection.deleteOne({email: email})
    }
}