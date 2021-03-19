const Role = require('../models/role');
const { Categoria, Usuario } = require('../models/')


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

const existeUsuarioID = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID no existe ${id}.`)
    }
}

const existeCategoriaID = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoria ${id} no existe`)
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioID,
    existeCategoriaID
}