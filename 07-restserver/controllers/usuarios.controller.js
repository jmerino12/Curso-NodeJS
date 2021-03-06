const { response} = require('express')


const usuariosGET = (req, res = response) => {
    res.json({
        status:"ok",
        msg: "get api - controller"
    });
}

const usuariosPUT = (req, res) => {
    res.json({
        status:"ok",
        msg: "put api - controller"
    });
  }

  const usuariosPOST = (req, res) => {
    const {nombre,edad} = req.body;
    res.json({
        status:"ok",
        msg: "post api - controller",
        nombre
    });
  }

const usuariosDELETE = (req, res) => {
    res.json({
        status:"ok",
        msg: "delete api - controller"
    });
  }

module.exports = {
    usuariosGET,
    usuariosPUT,
    usuariosDELETE,
    usuariosPOST
}