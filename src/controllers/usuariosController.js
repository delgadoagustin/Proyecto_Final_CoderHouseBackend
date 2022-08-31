import { Dao } from "../daos/configDao.js"
import { bcrypt_functions } from "../utils/password/bcrypt.js";
import { getToken } from "../utils/jwt/jwt.js";


export const usuariosController = {
    //VERIFICA QUE EL USUARIO ESTE INGRESADO, DE NO SER ASI LO REGISTRA Y DEVUELVE UN TOKEN
    registro: async(req, res) => {
        try {
            if(req.user){
                res.status(200).send({
                    msg: "Ya esta logueado"
                })
            }
            if(!(await Dao.usuarios.existEmail(req.body.email))){
                const usuario = {
                    nombre: req.body.nombre,
                    telefono: req.body.telefono,
                    email: req.body.email,
                    password: await bcrypt_functions.createHash(req.body.password)
                }
                const user = await Dao.usuarios.addOne(usuario);
                if(!user){
                    res.status(200).send({
                        msg: "Problemas al registrar"
                    });
                }
                res.status(200).send({
                    msg: "Usuario Agregado",
                    token: getToken(usuario)
                });
            }
            else{
                res.status(400).send("Email en Uso");
            }
        } catch (error) {
            
        }
    },

    //VISTA DE REGISTRO
    vistaRegistro: (req,res) => {
        res.render("register");
    },

    //VERIFICA QUE NO ESTE INGRESADO, SINO VALIDA LOS DATOS Y DEVUELVE UN TOKEN
    login: async (req, res) => {
        try {
            if(!req.user){
                const usuario = await Dao.usuarios.getByEmail(req.body.email);
                const match = await bcrypt_functions.checkPass(req.body.password,usuario.password);
                if(!match){
                    res.status(401).send({
                        msg: "Usuario Invalido"
                    })
                }else{
                    const token = getToken({usuario});
                    req.session.token = `Bearer ${token}`;
                    req.session.usuario = usuario;
                    res.status(200).send({
                        msg: "Usuario Autorizado",
                        token: token
                    })
                }
                
            }
            else{
                console.log(req.user)
                res.status(200).send({
                    msg: "Ya esta logueado"
                })
            }
                
        } catch (error) {
            
        }
    },

    //VISTA DE LOGIN
    vistaLogin: (req,res) => {
        res.render("login")
    },

    //DESTRUYE LA SESION PERO NO INVALIDA EL TOKEN
    logout: (req, res) => {
        req.session.destroy(err=>{
            if(err){
                return res.send("LOGOUT ERROR")
            }
            res.send("Logout OK")
        })
    }

}
