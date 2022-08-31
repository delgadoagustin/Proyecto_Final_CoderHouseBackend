export const mensajesController = {
    //DEVUELVE LA VISTA DE LOS MENSAJES
    vista: (req, res) => {
        const usuario = req.session.usuario
        res.render("index", {usuario})
    }
}