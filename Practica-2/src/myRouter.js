import express from "express";                          //Los import que no se usen no hace falta incluirlos aunque uno dependa de otro
import * as elementos from './elementos.js'

const router = express.Router();
let i=0;

router.get('/', (req, res) => {                         //router.get(ruta donde se va a imprimir la pagina html, funcion con el nombre de la pagina a modificar y que modifica la misma)
    res.render('index', {
        pizzas: elementos.getElems()
    })
})

router.post('/new', (req, res) => {
    res.render('new', {

    })
})

export default router;