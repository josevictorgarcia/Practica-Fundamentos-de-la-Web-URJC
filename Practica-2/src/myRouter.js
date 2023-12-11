import express from "express";                          //Los import que no se usen no hace falta incluirlos aunque uno dependa de otro
import ExpressValidator from 'express-validator';
import * as elementos from './pizzaService.js'
//import * as elemento from './elemento.js'

const router = express.Router();
const { body, validationResult } = ExpressValidator;

router.get('/', (req, res) => {                         //router.get(ruta donde se va a imprimir la pagina html, funcion con el nombre de la pagina a modificar y que modifica la misma)
    res.render('index', {
        pizzas: elementos.getElems(),
        //pizze_rosse_head: "",
        //pizze_rosse: elementos.getElemsCategoria("Rosse")
    })
})

router.post(
    '/new',
    body('nombre').trim().notEmpty(),
    body('url').trim().isURL(),
    body('ingredientes').trim().notEmpty(),
    (req, res) => {
        if (validationResult(req).isEmpty()) {
            let { gluten, huevos, pescado, fcascara } = req.body
            let alergenos = [gluten, huevos, pescado, fcascara]
            alergenos = alergenos.filter((elem) => elem != undefined)
            let { nombre, url, ingredientes, categoria } = req.body
            let isRosse = (categoria === 'true')
            let id = elementos.newId();
            elementos.addElem({ id: id, nombre: nombre, url: url, ingredientes: ingredientes, alergenos: alergenos, isRosse: isRosse, subelementos: [] })
            //console.log(id)
            //console.log(elementos.getElemsSize())
            res.render('new', {

            })
        } else {

        }
    }
)

router.get('/:id', (req, res) => {
    let post = elementos.getElem(parseInt(req.params.id))
    //console.log(post)
    res.render('elemento', {
        post
    })
})

router.get('/:id/delete', (req, res) => {
    elementos.remove(parseInt(req.params.id))
    res.render('deleted', {

    })
})

router.post('/create', (req, res) => {
    let post = {id: -1, nombre: "", url: "", ingredientes: "", alergenos: [], isRosse: true, subelementos: []}
    res.render('formulario_elemento', {
        title: 'CREAR PLATO NUEVO',
        action: '/new',
        post
    })
})

router.get('/:id/edit', (req, res) => {
    let post = elementos.getElem(parseInt(req.params.id))
    let alergenos = []
    //console.log(post.alergenos)
    post.alergenos.forEach(element => {
        switch (element) {
            case "https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoGluten-Gluten_icon-icons.com_67600.png": alergenos[0] = true; break;
            case "https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoHuevo-Egg_icon-icons.com_67598.png": alergenos[1] = true; break;
            case "https://cdn.icon-icons.com/icons2/852/PNG/512/Fish_icon-icons.com_67594.png": alergenos[2] = true; break;
            case "https://cdn.icon-icons.com/icons2/852/PNG/512/IconoAlergenoFrutosCascaraPeelFruits_icon-icons.com_67601.png": alergenos[3] = true; break;
        }
    });
    //console.log(alergenos);
    //console.log(post.isRosse)
    res.render('formulario_elemento', {
        title: 'MODIFICAR PLATO',
        action: post.id + '/modify',
        post,
        gluten: alergenos[0],
        huevos: alergenos[1],
        pescado: alergenos[2],
        fcascara: alergenos[3]
    })
})

router.post(
    '/:id/:id/modify',
    body('nombre').trim().notEmpty(),
    body('url').trim().isURL(),
    body('ingredientes').trim().notEmpty(),
    (req, res) => {
        if (validationResult(req).isEmpty()) {
            let post = elementos.getElem(parseInt(req.params.id))
            let { gluten, huevos, pescado, fcascara } = req.body
            let alergenos = [gluten, huevos, pescado, fcascara]
            alergenos = alergenos.filter((elem) => elem != undefined)
            let { nombre, url, ingredientes, categoria } = req.body
            let isRosse = (categoria === 'true')
            console.log({ id: parseInt(req.params.id), nombre: nombre, url: url, ingredientes: ingredientes, alergenos: alergenos, isRosse: isRosse })
            elementos.addElem({ id: parseInt(req.params.id), nombre: nombre, url: url, ingredientes: ingredientes, alergenos: alergenos, isRosse: isRosse, subelementos: post.subelementos })
            //console.log(id)
            //console.log(elementos.getElemsSize())
            res.render('new', {

            })
        }
    }
)

router.post('/:id', (req, res) => {
    let post = elementos.getElem(parseInt(req.params.id))
    let { user, score, review } = req.body
    let comentario = { user, score, review }
    //console.log(comentario)
    //console.log(post.subelementos)
    post.subelementos.push(comentario)
    //console.log(post.subelementos)
    //console.log(post.subelementos.length)
    res.render('elemento', {
        post
    })
})

//elementos.addElem({nombre: 'javier', url:'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D', ingredientes:'abcd efgh ijk', descripcion:'hola, soy comida', vegetariano: 'a', celiaco: 'c', id:id})

//elementos.addElem({nombre: 'jaer', url:'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D', ingredientes:'abcd efghawfeaef// ijk', descripcion:'hola, soy', vegetariano: 'av', celiaco: 'c', id:id})

//elementos.addElem({nombre: 'avie', url:'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D', ingredientes:'abc ijk', descripcion:'hola, comida', vegetariano: 'a', celiaco: 'cv', id:id})

//console.log([...elems.values()]);

//console.log(elementos.getElems());

export default router;