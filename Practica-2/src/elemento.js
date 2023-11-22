export class Elemento {

    constructor(nombre, url, ingredientes, descripcion, vegetariano, celiaco, id){
        this.nombre=nombre;
        this.url=url;
        this.descripcion=descripcion;
        this.ingredientes=ingredientes;
        this.vegetariano=vegetariano;
        this.celiaco=celiaco;
        this.id=id;
    }

    getNombre(){
        return this.nombre;
    }

    getUrl(){
        return this.url;
    }

    getDescripcion(){
        return this.descripcion;
    }

    getIngredientes(){
        return this.ingredientes;
    }

    getVegetariano(){
        return this.vegetariano;
    }

    getCeliaco(){
        return this.celiaco;
    }

    getId(){
        return this.id;
    }
}

export default {Elemento}