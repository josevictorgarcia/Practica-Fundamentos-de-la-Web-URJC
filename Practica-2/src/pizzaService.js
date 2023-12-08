//import * as elemento from './elemento.js';

const elems = new Map()
//let id=0;

export function addElem(elem){
    //let e = new elemento.Elemento(id, elem.nombre, elem.url, elem.ingredientes, elem.alergenos, elem.categoria);
    elems.set(elem.id, elem);
    //id++;
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
    return [...elems.values()]
}

//export function getElems(){
//    return [...elems.values()].sort(compareNames)
//}

//export function getElemsCategoria(categoria){
//    getElems().filter((elem) => elem.getCategoria() === categoria)
//}

export function getElemsSize(){
    return elems.size;
}

export function remove(id){
    elems.delete(id);
}

export function getElem(id){
    return elems.get(id);
}

//let e = new elemento.Elemento('antonio', 'url', 'ingredientes', 'descripcion', true, false, id)
//console.log(elems.size)
//addElem(e)
//console.log(elems.size)
//console.log([...elems.values(0)])