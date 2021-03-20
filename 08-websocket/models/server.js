const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.paths = {}
        //Middlewares
        this.middlwares();
        this.routes();

        //Condifugracion de sockets
        this.sockets();
    }


    middlwares() {
        this.app.use(cors());

        this.app.use(express.static('public'));
    }

    routes() {
        //this.app.use(this.paths.authPath, require('../routes/auth.routes'));
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    lister() {
        this.server.listen(this.port, () => {
            console.log('Sevidor corriendo en el puerto', this.port)
        })
    }
}


module.exports = Server;