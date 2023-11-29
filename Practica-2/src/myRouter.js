import express from "express";                          //Los import que no se usen no hace falta incluirlos aunque uno dependa de otro
import * as elementos from './elementos.js'
//import * as elemento from './elemento.js'

let id=0;

const router = express.Router();

router.get('/', (req, res) => {                         //router.get(ruta donde se va a imprimir la pagina html, funcion con el nombre de la pagina a modificar y que modifica la misma)
    res.render('index', {
        pizze_rosse_head: "",
        pizze_rosse: elementos.getElemsCategoria("Rosse")
    })
})

router.post('/new', (req, res) => {
    let {nombre, url, ingredientes, vegetariano, celiaco, descripcion} = req.body
    elementos.addElem({nombre: nombre, url:url, ingredientes:ingredientes, vegetariano:vegetariano, celiaco:celiaco, descripcion:descripcion, id:id})
    id++
    //console.log(id)
    //console.log(elementos.getElemsSize())
    res.render('new', {
        
    })
})

router.get('/:id', (req, res) => {
    let post = elementos.getElem(parseInt(req.params.id))
    console.log(post)
    res.render('elemento', {post})
})

//elementos.addElem({nombre: 'javier', url:'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D', ingredientes:'abcd efgh ijk', descripcion:'hola, soy comida', vegetariano: 'a', celiaco: 'c', id:id})

//elementos.addElem({nombre: 'jaer', url:'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D', ingredientes:'abcd efghawfeaef// ijk', descripcion:'hola, soy', vegetariano: 'av', celiaco: 'c', id:id})

//elementos.addElem({nombre: 'avie', url:'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D', ingredientes:'abc ijk', descripcion:'hola, comida', vegetariano: 'a', celiaco: 'cv', id:id})

//console.log([...elems.values()]);
console.log(elementos.getElems());

export default router;