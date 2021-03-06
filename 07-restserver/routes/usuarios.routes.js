const {Router} = require('express');
const {usuariosGET, usuariosDELETE, usuariosPUT,usuariosPOST} = require('../controllers/usuarios.controller');
const router = Router();

router.get('/', usuariosGET);

router.put('/:id',usuariosPUT );

router.post('/',usuariosPOST );

router.delete('/:id', usuariosDELETE);

module.exports = router;