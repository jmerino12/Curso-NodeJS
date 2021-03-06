const {request, response} = require('express')


const usuariosGET = (req = request, res = response) => {
    const {q,nombre = "Non",apikey, page = 1, limit} = req.query
    res.json({
        status:"ok",
        msg: "get api - controller",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPUT = (req = request, res = response) => {
    const {id} =req.params
    res.json({
        status:"ok",
        msg: "put api - controller",
        id
    });
  }

  const usuariosPOST = (req = request, res = response) => {
    const {nombre,edad} = req.body;
    res.json({
        status:"ok",
        msg: "post api - controller",
        nombre
    });
  }

const usuariosDELETE = (req = request, res = response) => {
    const {id} =req.params
    res.json({
        status:"ok",
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