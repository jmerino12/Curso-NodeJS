const Role = require('../models/role');
const { Categoria, Usuario, Producto } = require('../models/')


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

const existeProductoID = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El producto ${id} no existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colecciones ${coleccion}, no es permitida, ${colecciones}`)
    }
    return true;
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioID,
    existeCategoriaID,
    existeProductoID,
    coleccionesPermitidas
}