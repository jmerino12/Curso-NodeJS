const { response, request } = require("express");
const { Categoria } = require('../models');

//obtener categorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    /* const usuarios = await Usuario.find(query)
         .skip(Number(desde))
         .limit(Number(limite));*/

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ])
    res.json({
        total,
        categorias
    });
}

//obtener categoria - populate{}
const obtenerCategoria = async (req = request, resp = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    //resp.json(categoria);
    if (categoria) {
        return resp.status(201).json({
            categoria
        })
    } else {
        return resp.status(400).json({
            msg: 'No existe esta categoria'
        })
    }
}
//Actualizar categoria
const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({
        categoria
    })
}

//Borrar categoira

const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.status(200).json({
        categoria
    })
}


//Crear
const crearCategoria = async (req, resp = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return resp.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await Categoria(data);

    //Guardar DB
    await categoria.save();

    resp.status(201).json(categoria);

}

module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
}