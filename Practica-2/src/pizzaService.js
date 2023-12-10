//import * as elemento from './elemento.js';

const elems = new Map()
let id = 0;

export function newId() {
    id++;
    return id - 1;
}

export function addElem(elem) {
    //let e = new elemento.Elemento(id, elem.nombre, elem.url, elem.ingredientes, elem.alergenos, elem.categoria);
    elems.set(elem.id, elem);
    //id++;
}

let gluten = "https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png";
let huevos = "https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoHuevo-Egg_icon-icons.com_67598.png";

addElem({
    id: newId(), nombre: "4 Formaggio", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PF4F.png",
    ingredientes: "Salsa de tomate y nuestra mezcla especial de cuatro quesos.", alergenos: [gluten], isRosse: true,
    subelementos: [
        {user: "Anonymous User 1", score: "5", review: "La mejor pizza 4 quesos que he probado hasta el momento. Recomiendo a todo el mundo venir y probar esta pizza."},
        {user: "Anonymous User 2", score: "0", review: "Asquerosa, no pude acabarla"}
    ]
});

addElem({
    id: newId(), nombre: "Barbacoa de Pollo", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFBB.png",
    ingredientes: "Salsa barbacoa, mozzarella, carne picada, bacon, pollo y extra de mozzarella.", alergenos: [gluten], isRosse: true, subelementos: []
});
addElem({
    id: newId(), nombre: "BBQ Crispy", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFBBCCC.png",
    ingredientes: "Salsa barbacoa, mozzarella, bacon crujiente, pollo y extra de Salsa BBQ.", alergenos: [gluten], isRosse: true, subelementos: []
});
addElem({
    id: newId(), nombre: "Carbonara", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFCA.png",
    ingredientes: "Salsa carbonara, nata, mozzarella, bacon, cebolla, champiñón y extra de mozzarella.", alergenos: [gluten, huevos], isRosse: false, subelementos: []
});
addElem({
    id: newId(), nombre: "Carlina", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFCARLIN.png",
    ingredientes: "Salsa carbonara, mozzarella, pollo, tomate cherry, orégano y deliciosa salsa césar.", alergenos: [gluten, huevos], isRosse: false, subelementos: []
});
addElem({
    id: newId(), nombre: "Cabrini", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFCABR.png",
    ingredientes: "Salsa carbonara, deliciosa mezcla de quesos suaves y queso de cabra.", alergenos: [gluten, huevos], isRosse: false, subelementos: []
});
addElem({
    id: newId(), nombre: "Deluxe", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFDELUXE.png",
    ingredientes: "Salsa de tomate, mozzarella, carne de ternera, champiñón, pepperoni y pimiento verde.", alergenos: [gluten], isRosse: true, subelementos: []
});
addElem({
    id: newId(), nombre: "Diabola", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFDI.png",
    ingredientes: "Salsa picante, mozzarella, carne picada, cebolla, aceitunas negras y pimiento morrón.", alergenos: [gluten], isRosse: true, subelementos: []
});
addElem({
    id: newId(), nombre: "New BBQ", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFNBBC.png",
    ingredientes: "Salsa BBQ, mozzarella, bacon, cebolla y pollo asado.", alergenos: [gluten], isRosse: true, subelementos: []
});
addElem({
    id: newId(), nombre: "Peperoni", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFCARPE.png",
    ingredientes: "Salsa de tomate, mozzeralla y doble de pepperoni.", alergenos: [gluten], isRosse: true, subelementos: []
});
addElem({
    id: newId(), nombre: "Tropicale", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFTR.png",
    ingredientes: "Salsa de tomate, mozzarella, jamón, piña y extra de mozzarella.", alergenos: [gluten], isRosse: true, subelementos: []
});
addElem({
    id: newId(), nombre: "Vegetale", url: "https://sources-01.s3.eu-west-3.amazonaws.com/produccion/recursos/430/imagenes/fotos/articulos/PFVE.png",
    ingredientes: "Salsa de tomate, mozzarella, champiñón, aceitunas negras, cebolla y pimiento morrón.", alergenos: [gluten], isRosse: true, subelementos: []
});

export function getElems() {
    return [...elems.values()].sort((a, b) => (a < b ? 1 : -1));
}

//export function getElems(){
//    return [...elems.values()].sort(compareNames)
//}

//export function getElemsCategoria(categoria){
//    getElems().filter((elem) => elem.getCategoria() === categoria)
//}

export function getElemsSize() {
    return elems.size;
}

export function remove(id) {
    elems.delete(id);
}

export function getElem(id) {
    return elems.get(id);
}

//let e = new elemento.Elemento('antonio', 'url', 'ingredientes', 'descripcion', true, false, id)
//console.log(elems.size)
//addElem(e)
//console.log(elems.size)
//console.log([...elems.values(0)])