const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const validatJWT = async (req = request, resp = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return response.status(401).json({
            msg: "No hay token en la peticion"
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const usuario = req.usuario = await Usuario.findById(uid);
        if (!usuario) {
            return resp.status(401).json({
                msg: 'Usuario no existe en BD'
            })
        }
        if (!usuario.estado) {
            return resp.status(401).json({
                msg: 'Token no valido'
            })
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        resp.status(401).json({
            msg: "Token no valido"
        })
    }

}

module.exports = {
    validatJWT
}