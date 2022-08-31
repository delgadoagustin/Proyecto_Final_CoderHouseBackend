export class productosMemoryDao {
    constructor() {
        this.productos = [];
    }

    addOne(producto) {
        this.productos.push(producto);
    }

    getAll() {
        return this.productos;
    }

    getAllByCategoria(categoria){
        return this.productos.filter(producto => producto.categoria == categoria);
    }
    
    getById(Id){
        return this.productos[Id];
    }
}
