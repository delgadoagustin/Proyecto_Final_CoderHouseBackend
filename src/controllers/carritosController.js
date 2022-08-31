import { Dao } from "../daos/configDao.js";
import { sendEmail } from "../utils/nodemailer/nodemailer.js";


//CONTROLADORES PARA LAS RUTAS DE CARRITOS


export const carritosController = {
       
    //DEVUELVE EL CARRITO CORRESPONDIENTE AL USUARIO Y SI NO LO TIENE LO GENERA
    obtenerCarritoPorEmail: async (req, res) => {
        try {
            const email = req.user.email;
            const carrito = await Dao.carritos.getByEmail(email);
            if(!carrito){
                const carrito = {
                    email: req.user.email,
                    fechaYHora: Date.now(),
                    productos: [],
                }
                const nuevo = await Dao.carritos.addOne(carrito);
                res.status(200).send(nuevo);

            }
            else{
                res.status(200).send(carrito);
            }
            
        } catch (error) {
            
        }
    },

    //AGREGA PRODUCTO A TRAVES DEL ID, AL CARRITO DEL USUARIO INGRESADO
    agregarProductoACarrito: async (req, res) => {
        try {
            const {id, cantidad} = req.body
            const email = req.user.email;
            const producto = await Dao.productos.getById(id);
            await Dao.carritos.addProducto(email, producto, cantidad);
            res.status(200).send({
                result: `Producto Agregado al Carrito de ${email}`
            });
        } catch (error) {
            
        }
    },
    
    //ELIMINA PRODUCTO A TRAVES DEL ID, AL CARRITO DEL USUARIO INGRESADO
    eliminarProductoPorId: async (req,res) => {
        try {
            const email = req.user.email;
            const id = req.params.id;
            const carrito = await Dao.carritos.getByEmail(email)
            if(carrito.productos.findIndex(x => x.producto._id==id)!= -1){
                console.log("hola");
                await Dao.carritos.deleteProductoById(email,id);
                res.status(200).send({
                    result: `Producto Eliminado del Carrito de ${email}`
                });
            }
            else {
                res.status(200).send({
                    result: `Producto No encontrado en Carrito`
                });
            }
            
        } catch (error) {
            
        }
    },

    //CARGA LA ORDEN CON LOS ELEMENTOS DEL CARRITO Y LA ENVIA AL MAIL DEL USUARIO INGRESADO
    finalizarCompra: async (req,res) => {
        const email = req.user.email;
        const carrito = await Dao.carritos.getByEmail(email);
        if(!carrito||carrito.productos.length==0){
            res.send({
                msg: "Debes tenes productos en el carrito"
            })
        }
        else {
            const orden = {
                email: email,
                fechaYHora: Date.now(),
                numeroOrden: (await Dao.ordenes.count())+1,
                productos: carrito.productos,
                estado: "Generada",
                direccion: carrito.direccion
            }
            await Dao.carritos.deleteCarrito(email);
            let result = await Dao.ordenes.addOne(orden);
            await sendEmail(email,result)
            res.send({
                result
            })
        }
        

    }
    
}