import jwt from "jsonwebtoken"
import config from "../../config.js";

export default {

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