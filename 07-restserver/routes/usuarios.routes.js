const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail, existeUsuarioID } = require('../helpers/DBValidator');
const { usuariosGET, usuariosDELETE, usuariosPUT, usuariosPOST } = require('../controllers/usuarios.controller');
const router = Router();

router.get('/', usuariosGET);

router.put('/:id',
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom(existeUsuarioID),
    check('rol').custom(esRolValido),
    validarCampos
    , usuariosPUT);

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').notEmpty(),
    check('password', 'El password es obligatoria y debe ser mas de 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'El correo no es valido.').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), 
    check('rol').custom(esRolValido),
    validarCampos],
    usuariosPOST);


router.delete('/:id', usuariosDELETE);

module.exports = router;