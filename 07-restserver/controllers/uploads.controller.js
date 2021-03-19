const { response } = require('express');
const { subirArchivo } = require('../helpers');


const cargarArchivo = async (req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No hay archivos en la peticion' });
    }

    if (!req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos en la peticion' });
    }
    const nombre = await subirArchivo(req.files);

    res.json({
        nombre
    })
}

module.exports = {
    cargarArchivo
}