const path = require('path');
const fs = require('fs')
const { response } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models')


const cargarArchivo = async (req, res = response) => {
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

const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({
                msg: "No esta definida"
            })
            break;
    }

    //Limipiar imagenes previas
    console.log(modelo);
    if (modelo.img) {
        //Borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    modelo.img = await
        res.json({
            modelo
        })
}

const mostrarImagen = async (req, resp = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return resp.status(400).json({
                    msg: `No existe un usuario con id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return resp.status(400).json({
                    msg: `No existe un producto con id ${id}`
                })
            }
            break;

        default:
            return resp.status(500).json({
                msg: "No esta definida"
            })
            break;
    }

    //Limipiar imagenes previas
    if (modelo.img) {
        //Borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return resp.sendFile(pathImagen);
        }
    }
    const noImage = path.join(__dirname, '../assets/no-Image.jpg');
    resp.sendFile(noImage);
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}