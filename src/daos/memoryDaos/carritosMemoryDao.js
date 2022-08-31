export class carritosMemoryDao {
    constructor(){
        this.carritos = [];
    }
    addOne(carrito) {
        this.carritos.push(carrito);
    }

    getAll() {
        return this.carritos;
    }

    getByEmail(email) {
        return this.carritos.find(carrito => carrito.email == email);
    }

    addProducto(email, producto) {
        const id = this.carritos.findIndex(carrito => carrito.email == email);
        this.carritos[id].productos.push(producto);
    }

    deleteProductoById(email, prodId) {
        const id = this.carritos.findIndex(carrito => carrito.email == email);
        this.carritos[id].productos.splice(prodId,1);
    }
    
}