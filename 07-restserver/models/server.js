const express = require('express');
const cors = require('cors')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        //Middlewares
        this.middlwares();
        this.routes();
    }

    middlwares(){
        this.app.use(cors());
        this.app.use(express.json())           //Lecutra y paseo del body
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios.routes'));
    }

    lister(){
        this.app.listen(this.port, () =>{
            console.log('Sevidor corriendo en el puerto',this.port)
        })
    }
}


module.exports = Server;