const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGET = (req = request, res = response) => {
    const { q, nombre = "Non", apikey, page = 1, limit } = req.query
    res.json({
        status: "ok",
        msg: "get api - controller",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPUT = async (req = request, res = response) => {
    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;
    //Validar contra base de datos
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findOneAndUpdate(id, resto);


    res.json({
        status: "ok",
        msg: "put api - controller",
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
        msg: "post api - controller",
        usuario
    });
}

const usuariosDELETE = (req = request, res = response) => {
    const { id } = req.params
    res.json({
        status: "ok",
        msg: "delete api - controller",
        id
    });
}

module.exports = {
    usuariosGET,
    usuariosPUT,
    usuariosDELETE,
    usuariosPOST
}