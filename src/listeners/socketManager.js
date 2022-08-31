import { Dao } from "../daos/configDao.js"

export const socketManager = (io, session) => {

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
    
    io.use(wrap(session));
    io.use((socket,next)=>{
        const session = socket.request.session
        if(session){
            next()
        } else {
            next(new Error("unauthorized"));
        }
    })
    io.on("connection", async (socket) => {
        const messages = await Dao.mensajes.getAll()
        socket.emit('messages', messages)
        socket.on("new-message", async (data) => {
            data.email = socket.request.session.usuario.email
            await Dao.mensajes.addOne(data)
            const messages = await Dao.mensajes.getAll()
            io.sockets.emit("messages", messages);
        });

    })
}