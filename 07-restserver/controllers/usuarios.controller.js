const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
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

const usuariosPUT = (req = request, res = response) => {
    const { id } = req.params
    res.json({
        status: "ok",
        msg: "put api - controller",
        id
    });
}

const usuariosPOST = async (req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    //const { nombre, edad } = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre, correo, password, rol
    });
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo se encuentra registrado'
        })
    }
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