const {Router} = require('express');
const {usuariosGET, usuariosDELETE, usuariosPUT} = require('../controllers/usuarios.controller');
const router = Router();

router.get('/', usuariosGET);

  router.put('/', );

  router.post('/', usuariosPUT);

  router.delete('/', usuariosDELETE);

  module.exports = router;