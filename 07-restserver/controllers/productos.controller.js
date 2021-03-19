const { response, request } = require("express");
const { Producto } = require('../models');


//Crear
const crearProducto = async (req, resp = response) => {
    const { estado, usuario, ...body } = req.body;
    const nombre = body.nombre.toUpperCase();
    const productoBD = await Producto.findOne({ nombre });

    if (productoBD) {
        return resp.status(400).json({
            msg: `El producto ${productoBD.nombre} ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id,

    }

    const producto = await Producto(data);

    //Guardar DB
    await producto.save();

    resp.status(201).json(producto);

}

//obtener categorias - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ])
    res.json({
        total,
        productos
    });
}

//obtener categoria - populate{}
const obtenerProducto = async (req = request, resp = response) => {
    const { id } = req.params;

    const producto = await Producto.findById(id).populate('categoria', 'nombre');

    //resp.json(categoria);
    if (producto) {
        return resp.status(201).json({
            producto
        })
    } else {
        return resp.status(400).json({
            msg: 'No existe este producto'
        })
    }
}

//Actualizar categoria
const actualizarProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({
        producto
    })
}

//Borrar categoira

const borrarProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.status(200).json({
        producto
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}