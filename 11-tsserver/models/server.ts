import express, { Application } from 'express';
import userRoutes from "../routes/usuario.route";
import cors from "cors"
import db from '../db/connection';

//Primero importaciones de 3eros, luego la de nosotros y si fuera de node de primero
class Server {
    private app: Application;
    private port: String;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    //TODO: Conectar base de datos
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('db online');
        } catch (error) {
            console.log(error);
            throw new Error(`No se puedo inicializar ${error} `)
        }
    }


    middlewares() {
        //CORS
        this.app.use(cors());
        //LECTURA DEL BODY
        this.app.use(express.json());
        //CAPETA PUBLICA
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export default Server;