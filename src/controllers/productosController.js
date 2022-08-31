import { Dao } from "../daos/configDao.js"

export const productosController = {
    
    obtenerTodosLosProductos: async(req, res) => {
        try {
            const productos = {
                Productos: await Dao.productos.getAll()
            };
            res.status(200).send(productos);
        } catch (error) {

        }
        
    },

    agregarProducto: (req,res) => {
        try {
            const producto = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion, 
                categoria: req.body.categoria, 
                precio: req.body.precio, 
                stock: req.body.stock, 
                imagen: req.body.imagen
            }
            Dao.productos.addOne(producto);
            res.status(200).send("Producto Agregado!")
        } catch (error) {
            res.status(500).send("Problemas al Agregar Producto")
        }
    },

    obtenerProductosPorCategoria: async (req, res) => {
        try {
            const categoria = req.params.categoria;
            const productos = await Dao.productos.getAllByCategoria(categoria)
            if(productos.length==0){
                res.status(200).send({
                    msg: "Categoria No Encontrada"
                })
            }
            res.status(200).send(productos)
        } catch (error) {
            
        }
    },

    obtenerProductosPorId: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id);
            const producto = await Dao.productos.getById(id)
            if(!producto){
                return res.status(404).send({
                    msg: "Producto No Encontrado"
                })
            }
            res.status(200).send(producto)
        } catch (error) {
            
        }
    }

}

