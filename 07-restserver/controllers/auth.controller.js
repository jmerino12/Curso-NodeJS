const { response, request } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        //Varificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usario/password no son correctos - correo'
            })
        }
        //Si es usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usario/password no son correctos - false'
            })
        }
        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usario/password no son correctos - password'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).son({
            msg: 'Algo salio mal'
        });
    }

}

const googleSingIng = async (req, res = response) => {
    const { id_token } = req.body;
    try {
        const googleUser = await googleVerify(id_token);

        return res.json({
            msg: "Ok",
            googleUser
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Token de google no valido'
        })
    }

}

module.exports = {
    login,
    googleSingIng
}