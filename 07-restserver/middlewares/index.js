const validarCampos = require('../middlewares/validar-campos');
const validatJWT = require('../middlewares/validat-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo');


module.exports = {
    ...validarCampos,
    ...validatJWT,
    ...validaRoles,
    ...validarArchivoSubir
}