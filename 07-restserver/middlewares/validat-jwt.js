const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validatJWT = (req = request, resp = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return response.status(401).json({
            msg: "No hay token en la peticion"
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        req.uid = uid;
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