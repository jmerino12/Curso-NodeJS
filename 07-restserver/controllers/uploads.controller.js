const { response } = require('express');
const { subirArchivo } = require('../helpers');


const cargarArchivo = async (req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No hay archivos en la peticion' });
    }

    if (!req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos en la peticion' });
    }
    try {
        const nombre = await subirArchivo(req.files);
        res.status(400).json({
            nombre
        });
    } catch (error) {
        res.status(400).json({
            error
        });
    }


}

module.exports = {
    cargarArchivo
}