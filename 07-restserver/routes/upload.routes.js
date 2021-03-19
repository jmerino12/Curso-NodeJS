const { Router } = require('express');
const { buscar } = require('../controllers/buscar.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo } = require('../controllers/uploads.controller')

const router = Router();

router.post('/', cargarArchivo);


module.exports = router;