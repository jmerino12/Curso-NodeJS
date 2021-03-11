const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGET, usuariosDELETE, usuariosPUT, usuariosPOST } = require('../controllers/usuarios.controller');
const router = Router();

router.get('/', usuariosGET);

router.put('/:id', usuariosPUT);

router.post('/', [check('correo', 'El correo no es valido.').isEmail(),], usuariosPOST);

router.delete('/:id', usuariosDELETE);

module.exports = router;