import * as elemento from './elemento.js';

const elems = new Map()
let id=0;

export function addElem(elem){
    let e = new elemento.Elemento(id, elem.nombre, elem.url, elem.ingredientes, elem.alergenos, elem.categoria);
    elems.set(id, e);
    id++;
}

function compareNames(a, b){
    if (a.getNombre() < b.getNombre()) {
        return -1;
      } else if (a.getNombre() > b.getNombre()) {
        return 1;
      }
      return 0;
}

export function getElems(){
    return [...elems.values()].sort(compareNames)
}

export function getElemsCategoria(categoria){
    getElems().filter((elem) => elem.getCategoria() === categoria)
}

export function getElem(id){
    return elems.get(id);
}

