const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

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


        res.json({
            msg: 'Login ok'
        });
    } catch (error) {
        console.log(error)
        return res.status(500).son({
            msg: 'Algo salio mal'
        });
    }

}

module.exports = {
    login
}