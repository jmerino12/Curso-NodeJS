const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        //Conectar a BD
        this.conectarDB();
        //Middlewares
        this.middlwares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlwares() {
        this.app.use(cors());
        this.app.use(express.json())           //Lecutra y paseo del body
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
    }

    lister() {
        this.app.listen(this.port, () => {
            console.log('Sevidor corriendo en el puerto', this.port)
        })
    }
}


module.exports = Server;