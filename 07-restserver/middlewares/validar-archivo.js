const { response } = require("express")

const validarArchivoSubir = (req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No hay archivos en la peticion' });
    }

    if (!req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos en la peticion' });
    }
    next();
}

module.exports = {
    validarArchivoSubir
}