export class Elemento {

    constructor(id, nombre, url, ingredientes, alergenos, categoria){
        this.id=id;
        this.nombre=nombre;
        this.url=url;
        this.ingredientes=ingredientes;
        this.alergenos=alergenos;
        this.categoria = categoria;
    }

    getId(){
        return this.id;
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

    getAlergenos(){
        return this.alergenos;
    }

    getCategoria(){
        return this.categoria;
    }
}

export default {Elemento}