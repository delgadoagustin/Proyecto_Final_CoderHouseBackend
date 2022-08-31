export const mensajesController = {
    vista: (req, res) => {
        const usuario = req.session.usuario
        res.render("index", {usuario})
    }
}