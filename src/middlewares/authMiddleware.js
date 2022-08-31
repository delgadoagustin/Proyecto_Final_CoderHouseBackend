import jwt from "jsonwebtoken"
import config from "../../config.js";

export default {

    //VERIFICA EL TOKEN DEL HEADER O DE LA SESION, SI ESTA HABILITADO LO PASA POR REQ.USER (EN ESTE CASO PASA EL USUARIO COMPLETO!!)
    checkAuthenticatedJWT: (req,res,next)=>{
        const authHeader = req.headers.authorization||req.session.token;
        if(!authHeader){
            return res.status(401).send({
                msg: "Usuario No Autorizado"
            });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.JWT_SECRET, (err,decoded)=>{
            if(err){
                return res.status(401).send({
                    msg: "Usuario No Autorizado"
                });
            }
            req.user = decoded.usuario;
            next();
        })
    },

    //VERIFICA SI EL ESTA LOGUEADO
    checkLoggedIn: (req,res,next) => {
        const authHeader = req.headers.authorization||req.session.token;
        if(!authHeader){
            return next();
        }
        else{
            const token = authHeader.split(' ')[1];
            jwt.verify(token, config.JWT_SECRET, (err,decoded)=>{
                if(err){
                    return next()
                }
                else{
                    return res.status(200).send({
                        msg: "Ya estas logueado"
                    })
                }
            })
            
        }
    },

    //VERIFICACION DE LOGUEO PARA REDIRECCION EN LAS VISTAS
    checkLoggedInView: (req,res,next) => {
        const authHeader = req.headers.authorization||req.session.token;
        if(!authHeader){
            return res.status(401).redirect("/login");
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.JWT_SECRET, (err,decoded)=>{
            if(err){
                return res.status(401).send({
                    msg: "Usuario No Autorizado"
                });
            }
            req.user = decoded.usuario;
            res.redirect("/productos")
        })
    }

}