const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGET = async (req = request, res = response) => {
    //const { q, nombre = "Non", apikey, page = 1, limit } = req.query
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    /* const usuarios = await Usuario.find(query)
         .skip(Number(desde))
         .limit(Number(limite));*/

    const [total, Usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ])
    res.json({
        total,
        Usuarios
    });
}

const usuariosPUT = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //Validar contra base de datos
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findOneAndUpdate(id, resto);


    res.json({
        status: "ok",
        usuario
    });
}

const usuariosPOST = async (req = request, res = response) => {
    //const { nombre, edad } = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre, correo, password, rol
    });

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //Guardar bd
    await usuario.save();

    res.json({
        status: "ok",
        usuario
    });
}

const usuariosDELETE = async (req = request, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({ usuario });
}

module.exports = {
    usuariosGET,
    usuariosPUT,
    usuariosDELETE,
    usuariosPOST
}