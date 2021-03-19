const { response, request } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");



const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino); //True
    if (isMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.status(201).json({
            results: (usuario) ? [usuario] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    return res.status(201).json({
        results: usuarios
    });
}

const buscarCategoria = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino); //True
    if (isMongoId) {
        const categoria = await Categoria.findById(termino, { estado: true });
        return res.status(201).json({
            results: (categoria) ? [categoria] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({ nombre: regex, estado: true });
    return res.status(201).json({
        results: categorias
    });
}

const buscarProducto = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino); //True
    if (isMongoId) {
        const producto = await Producto.findById(termino, { estado: true }).populate('categoria', 'nombre');
        return res.status(201).json({
            results: (producto) ? [producto] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre');
    return res.status(201).json({
        results: productos
    });
}

const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categoria':
            buscarCategoria(termino, res);
            break;

        case 'productos':
            buscarProducto(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
            break;
    }

}

module.exports = {
    buscar
}