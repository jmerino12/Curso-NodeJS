const express = require('express');
const cors = require('cors')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //Middlewares
        this.middlwares();
        this.routes();
    }

    middlwares(){
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/api', (req, res) => {
            res.json({
                status:"ok",
                msg: "get api"
            });
          });

          this.app.put('/api', (req, res) => {
            res.json({
                status:"ok",
                msg: "put api"
            });
          });

          this.app.post('/api', (req, res) => {
            res.json({
                status:"ok",
                msg: "post api"
            });
          });

          this.app.delete('/api', (req, res) => {
            res.json({
                status:"ok",
                msg: "delete api"
            });
          });
    }

    lister(){
        this.app.listen(this.port, () =>{
            console.log('Sevidor corriendo en el puerto',this.port)
        })
    }
}


module.exports = Server;