const {Router} = require('express');
const {usuariosGET, usuariosDELETE, usuariosPUT,usuariosPOST} = require('../controllers/usuarios.controller');
const router = Router();

router.get('/', usuariosGET);

router.put('/',usuariosPUT );

router.post('/',usuariosPOST );

router.delete('/', usuariosDELETE);

module.exports = router;