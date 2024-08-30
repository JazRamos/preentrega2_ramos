import express from 'express';
import routerCart from '../src/routes/cartRouter.js'
import productsRouter from '../src/routes/productsRouter.js';
import ProductManager from './manager/productManager.js';
import viewsRouter from "./routes/views.router.js";
import morgan from 'morgan';
import exphbs from "express-handlebars";
import { socketConfig } from './socketConfig.js';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';
import {initMongoDB} from './dao/mongodb/conection.js';

const productManager = new ProductManager(`${__dirname}/database/products.json`)

//Express
const app = express()
const PORT = 8080

//Servidor http
const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//Socket.io
socketConfig(httpServer);

//Middleware
app.use('/', express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Morgan
app.use(morgan('dev'))

//Rutas
app.use('/', viewsRouter);
app.use('/api/carts', routerCart);
app.use('/api/products', productsRouter);

//Manejo errores middleware
app.use(errorHandler);

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Mongodb
initMongoDB();


