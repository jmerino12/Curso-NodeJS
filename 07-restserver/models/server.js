const express = require('express');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //Middlewares
        this.middlwares();
        this.routes();
    }

    middlwares(){
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/api', (req, res) => {
            console.log("Hello world");
          });
    }

    lister(){
        this.app.listen(this.port, () =>{
            console.log('Sevidor corriendo en el puerto',this.port)
        })
    }
}


module.exports = Server;