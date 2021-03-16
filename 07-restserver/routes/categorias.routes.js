const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias.controller');
const { validatJWT, validarCampos } = require('../middlewares');
const router = Router();

//Obtener todas la categorias - publico
router.get('/', (req, resp) => {
    resp.json('OK')
});

//Obtener una categoria por ID - PUBLICO
router.get('/:id', (req, resp) => {
    resp.json('OK')
});


//Crear una categoria - privado - cualquier peersona con token valido
router.post('/', [validatJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos],
    crearCategoria);

//Actualizar - privado - cualquier persona con token valido
router.put('/:id', (req, resp) => {
    resp.json('OK')
});

//Borrar una categoria - Admin
router.delete('/:id', (req, resp) => {
    resp.json('OK')
});

module.exports = router;