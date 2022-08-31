export class usuariosMemoryDao{
    constructor(){
        this.arreglo = [];
    }

    addOne(usuario){
        this.arreglo.push(usuario);
    }

    getByEmail(email){
        return this.arreglo.find(usuario => usuario.email == email);
    }

    getAll(){
        return this.arreglo;
    }
}
