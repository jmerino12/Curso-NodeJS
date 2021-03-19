const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            usuariosPath: '/api/usuarios',
            authPath: '/api/auth',
            categoriasPath: '/api/categorias',
            productosPath: '/api/productos',
            buscarPath: '/api/buscar'
        }
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
        this.app.use(this.paths.authPath, require('../routes/auth.routes'));
        this.app.use(this.paths.usuariosPath, require('../routes/usuarios.routes'));
        this.app.use(this.paths.categoriasPath, require('../routes/categorias.routes'));
        this.app.use(this.paths.productosPath, require('../routes/productos.routes'));
        this.app.use(this.paths.buscarPath, require('../routes/buscar.routes'));

    }

    lister() {
        this.app.listen(this.port, () => {
            console.log('Sevidor corriendo en el puerto', this.port)
        })
    }
}


module.exports = Server;