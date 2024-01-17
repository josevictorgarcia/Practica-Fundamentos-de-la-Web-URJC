import express from "express";                          //Los import que no se usen no hace falta incluirlos aunque uno dependa de otro
import ExpressValidator from 'express-validator';
import * as elementos from './pizzaService.js'

const router = express.Router();
const { body, validationResult } = ExpressValidator;

router.get('/', (req, res) => {                         //router.get(ruta donde se va a imprimir la pagina html, funcion con el nombre de la pagina a modificar y que modifica la misma)
    
    //const pizzas = elementos.getPizzas(3, 3);                     //getPizzas(pizzasRosse, pizzasBianca) devuelve en este caso 3 pizzas rosse y 3 pizzas bianca (6 pizzas en total)

    res.render('index', {
        //pizzas: elementos.getElems()
        //pizzas: pizzas
    })
})

router.get('/pizzasRosse', (req, res) => {
    const from = parseInt(req.query.from)
    const to = parseInt(req.query.to)

    const pizzas = elementos.getRosse(from, to);

    res.render('pizza_card', {
        pizzas: pizzas
    })
})

router.get('/pizzasBianca', (req, res) => {
    const from = parseInt(req.query.from)
    const to = parseInt(req.query.to)

    const pizzas = elementos.getBianca(from, to);

    res.render('pizza_card', {
        pizzas: pizzas
    })
})

/*
router.get('/pizzas', (req, res) => {
    const rosse = parseInt(req.query.rosse)
    const bianca = parseInt(req.query.bianca)

    const pizzas = elementos.getPizzas(rosse, bianca);

    res.render('index', {
        pizzas: pizzas
    })
})
*/

router.get('/searchRosse', (req, res) => {
    let input = req.query.input;

    let pizzas = elementos.searchElemsRosse(input);
    
    res.render('pizza_card', {
        pizzas: pizzas
    })
})

router.get('/searchBianca', (req, res) => {
    let input = req.query.input;

    let pizzas = elementos.searchElemsBianca(input);
    
    res.render('pizza_card', {
        pizzas: pizzas
    })
})

router.get('/filterRosse', (req, res) => {
    let filter = req.query.filter;

    let pizzas = elementos.filterElemsRosse(filter);
    
    res.render('pizza_card', {
        pizzas: pizzas
    })
})

router.get('/filterBianca', (req, res) => {
    let filter = req.query.filter;

    let pizzas = elementos.filterElemsBianca(filter);
    
    res.render('pizza_card', {
        pizzas: pizzas
    })
})

router.get('/create', (req, res) => {
    let post = { id: -1, nombre: "", url: "", ingredientes: "", alergenos: [], isRosse: true, subelementos: [] }
    res.render('formulario_elemento', {
        title: 'CREAR PLATO NUEVO',
        action: '/new',
        post
    })
})

router.post(
    '/new',
    //body('nombre').trim().notEmpty(),
    //body('url').trim().isURL(),
    //body('ingredientes').trim().notEmpty(),
    (req, res) => {
        //if (validationResult(req).isEmpty()) {
            let form_values = JSON.parse(req.body.form_values)
            //let { gluten, huevos, pescado, fcascara } = req.body
            let alergenos = form_values[3]
            //alergenos = alergenos.filter((elem) => elem != undefined)
            //let { nombre, url, ingredientes, categoria } = req.body
            let isRosse = (form_values[4] === 'true')
            let id = elementos.newId();
            elementos.addElem({ id: id, nombre: form_values[0], url: form_values[1], ingredientes: form_values[2], alergenos: alergenos, isRosse: isRosse, subelementos: [] })
            //console.log(id)
            //console.log(elementos.getElemsSize())
            res.render('message', {
                message1: 'Se ha ',
                bolded: 'añadido',
                message2: ' el elemento con éxito',
                back: -1
            })
        /*} else {
            let invalids = '';
            validationResult(req).array().forEach(error => {
                invalids += ' ' + error.path
            });
            res.render('message', {
                message1: 'Los siguientes campos son inválidos:',
                bolded: invalids,
                message2: '.',
                back: '/'
            })
        }*/
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
    res.render('message', {
        message1: 'Elemento ',
        bolded: 'eliminado',
        message2: ' de la lista correctamente',
        back: -1
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
    //console.log(post.id)
    res.render('formulario_elemento', {
        title: 'MODIFICAR PLATO',
        action: 'modify',
        post,
        gluten: alergenos[0],
        huevos: alergenos[1],
        pescado: alergenos[2],
        fcascara: alergenos[3]
    })
})

router.post(
    '/:id/modify',
    //body('nombre').trim().notEmpty(),
    //body('url').trim().isURL(),
    //body('ingredientes').trim().notEmpty(),
    (req, res) => {
        let form_values = JSON.parse(req.body.form_values)
        let id = parseInt(JSON.parse(req.body.id))
        let post = elementos.getElem(parseInt(req.params.id))
        //if (validationResult(req).isEmpty()) {
            //let { gluten, huevos, pescado, fcascara } = req.body
            let alergenos = form_values[3]
            //let alergenos = [gluten, huevos, pescado, fcascara]
            //alergenos = alergenos.filter((elem) => elem != undefined)
            //let { nombre, url, ingredientes, categoria } = req.body
            //let isRosse = (categoria === 'true')
            let isRosse = (form_values[4] === 'true')
            //console.log({ id: parseInt(req.params.id), nombre: nombre, url: url, ingredientes: ingredientes, alergenos: alergenos, isRosse: isRosse })
            elementos.addElem({ id: id, nombre: form_values[0], url: form_values[1], ingredientes: form_values[2], alergenos: alergenos, isRosse: isRosse, subelementos: post.subelementos })
            //console.log(id)
            //console.log(elementos.getElemsSize())
            res.render('message', {
                message1: 'Se han ',
                bolded: 'guardado',
                message2: ' los cambios con éxito',
                back: id
            })
        /*} else {
            let invalids = '';
            validationResult(req).array().forEach(error => {
                invalids += ' ' + error.path
            });
            res.render('message', {
                message1: 'Los siguientes campos son inválidos:',
                bolded: invalids,
                message2: '.',
                back: '/' + post.id
            })
        }*/
    }
)

router.post(
    '/:id',
    body('user').trim().notEmpty(),
    body('review').trim(),
    (req, res) => {
        let post = elementos.getElem(parseInt(req.params.id))
        if (validationResult(req).isEmpty()) {
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
        } else {
            let invalids = '';
            validationResult(req).array().forEach(error => {
                invalids += ' ' + error.path
            });
            res.render('message', {
                message1: 'Los siguientes campos son inválidos:',
                bolded: invalids,
                message2: '.',
                back: '/' + post.id
            })
        }
    })

//elementos.addElem({nombre: 'javier', url:'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D', ingredientes:'abcd efgh ijk', descripcion:'hola, soy comida', vegetariano: 'a', celiaco: 'c', id:id})

//elementos.addElem({nombre: 'jaer', url:'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D', ingredientes:'abcd efghawfeaef// ijk', descripcion:'hola, soy', vegetariano: 'av', celiaco: 'c', id:id})

//elementos.addElem({nombre: 'avie', url:'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D', ingredientes:'abc ijk', descripcion:'hola, comida', vegetariano: 'a', celiaco: 'cv', id:id})

//console.log([...elems.values()]);

//console.log(elementos.getElems());

export default router;