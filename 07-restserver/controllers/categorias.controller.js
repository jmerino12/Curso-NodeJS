const { response } = require("express");
const { Categoria } = require('../models');
const categoria = require("../models/categoria");

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
    crearCategoria
}