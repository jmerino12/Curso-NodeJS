const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const existeEmail = async (correo = '') => {
    const exiteEmail = await Usuario.findOne({ correo });
    if (exiteEmail) {
        throw new Error(`El correo ${correo} ya existe.`)
        /*return res.status(400).json({
            msg: 'El correo se encuentra registrado'
        })*/
    }
}

module.exports = {
    esRolValido,
    existeEmail
}