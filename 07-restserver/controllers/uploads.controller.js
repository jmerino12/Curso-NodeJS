const path = require('path');
const { response } = require('express');

const cargarArchivo = (req, res = response) => {
    console.log(req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No hay archivos en la peticion' });
    }

    if (!req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos en la peticion' });
    }

    const { archivo } = req.files;
    const uploadPath = path.join(__dirname, '../uploads', archivo.name);

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send({ err });
        }
        res.status(201).json({ msg: 'File uploaded! ' + uploadPath });
    });
}

module.exports = {
    cargarArchivo
}