const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias.controller');
const { esRolValido,
    existeEmail,
    existeUsuarioID,
    existeCategoriaID } = require('../helpers/DBValidator');
const { validatJWT, validarCampos, esAdminRol } = require('../middlewares');
const router = Router();

//Obtener todas la categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria por ID - PUBLICO
router.get('/:id', [
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCampos
], obtenerCategoria);


//Crear una categoria - privado - cualquier peersona con token valido

router.post('/', [validatJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos],
    crearCategoria);

//Actualizar - privado - cualquier persona con token valido
router.put('/:id', [
    validatJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom(existeCategoriaID),
    validarCampos]
    , actualizarCategoria);

//Borrar una categoria - Admin
router.delete('/:id', [
    validatJWT,
    esAdminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaID),
    validarCampos], borrarCategoria);

module.exports = router;