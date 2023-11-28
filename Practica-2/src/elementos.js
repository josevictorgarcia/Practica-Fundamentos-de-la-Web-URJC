import * as elemento from './elemento.js';

const elems = new Map()
let id=0;

export function addElem(elem){
    let e = new elemento.Elemento(id, elem.nombre, elem.url, elem.ingredientes, elem.alergenos, elem.categoria);
    elems.set(id, e);
    id++;
}

export function getElems(){
    return [...elems.values()]
}

export function getElem(id){
    return elems.get(id);
}

//let e = new elemento.Elemento('antonio', 'url', 'ingredientes', 'descripcion', true, false, id)
//console.log(elems.size)
//addElem(e)
//console.log(elems.size)
//console.log([...elems.values(0)])