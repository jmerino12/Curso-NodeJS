const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
const { existeCategoriaID, existeProductoID } = require('../helpers/DBValidator');
const { validatJWT, validarCampos, esAdminRol } = require('../middlewares');
const router = Router();

router.post('/', [
    validatJWT,
    check('nombre', 'Nombre del productos es obligatoria').notEmpty(),
    check('categoria').custom(existeCategoriaID),
    validarCampos
], crearProducto)

//Obtener todas la categorias - publico
router.get('/', obtenerProductos);

//Obtener una categoria por ID - PUBLICO
router.get('/:id', [
    check('id', 'No es un ID valido.').isMongoId(),
    validarCampos
], obtenerProducto);

//Actualizar - privado - cualquier persona con token valido
router.put('/:id', [
    validatJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom(existeProductoID),
    validarCampos]
    , actualizarProducto);


//Borrar una categoria - Admin
router.delete('/:id', [
    validatJWT,
    esAdminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoID),
    validarCampos], borrarProducto);

module.exports = router;