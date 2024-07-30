import express, { Router } from 'express';

interface Options {
    port:number;
    //resivimos un objeto de tipo Router de express
    routes:Router;
    public_path?:string;
}

export class Server {

    private app = express();
    private readonly routes:Router;
    private readonly port:number;
    private readonly public_path:string;

    constructor(options:Options) {
        const {port,routes, public_path='public'} = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }
    
    async start() {
        //*Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        //*Routes
        // Recibimos el objeto Router de express y lo usamos en la aplicacion
        this.app.use(this.routes);
        
    

        this.app.listen(this.port, () => {
            console.log(`Server is running ${this.port}`);
        });
    }
}