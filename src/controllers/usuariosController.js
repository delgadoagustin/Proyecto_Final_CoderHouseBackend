import { Dao } from "../daos/configDao.js"
import { bcrypt_functions } from "../utils/password/bcrypt.js";
import { getToken } from "../utils/jwt/jwt.js";


export const usuariosController = {
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
                Dao.usuarios.addOne(usuario);
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

    vistaRegistro: (req,res) => {
        res.render("register");
    },

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

    vistaLogin: (req,res) => {
        res.render("login")
    },

    logout: (req, res) => {
        req.session.destroy(err=>{
            if(err){
                return res.send("LOGOUT ERROR")
            }
            res.send("Logout OK")
        })
    }

}
