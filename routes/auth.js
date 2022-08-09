/*
   
    Rutas de Usuario / Auth
    host + /api/auth

*/
// Declaro la ruta
const { Router } = require('express');
const router = Router();

// Validaciones
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');






// Creacion de endpoints
//* CREAR USUARIO
router.post(
    '/new',
    [
        // Validaciones
        // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos,

    ],
    crearUsuario
);

//* LOGIN DE USUARIO
router.post(
    '/', 
    [
        // Validaciones
        // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos,
    ], 
    loginUsuario
);

//* VALIDAR JWT
router.get('/renew',validarJWT, revalidarToken);


// Exportamos nuestras rutas
module.exports = router;