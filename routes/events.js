/*
   
    Rutas de Eventos / events
    host + /api/events

*/
// Rutas
const { Router } = require('express');
const router = Router();

// Validaciones
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')


//? Todas las rutas deben pasar por la validacion de JWT
router.use(validarJWT);





// Creacion de endpoints

//* OBTENER EVENTO
router.get('/', getEventos);

//* CREAR UN NUEVO EVENTO
router.post('/',
    [
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),


        validarCampos,
    ],
    crearEvento);

//* ACTUALIZAR EVENTO
router.put('/:id', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ], 
actualizarEvento);

//* BORRAR EVENTO
router.delete('/:id', eliminarEvento);



//* EXPORTAMOS NUESTRAS RUTAS
module.exports = router;

