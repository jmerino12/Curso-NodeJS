const validarCampos = require('../middlewares/validar-campos');
const validatJWT = require('../middlewares/validat-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validatJWT,
    ...validaRoles
}