import express from 'express';
import routerCart from '../src/routes/cartRouter.js'
import productsRouter from '../src/routes/productsRouter.js';
import viewsRouter from "./routes/views.router.js";
import morgan from 'morgan';
import exphbs from "express-handlebars";
import { Server } from 'socket.io';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/', viewsRouter);
app.use('/api/carts', routerCart);
app.use('/api/products', productsRouter);
app.use(errorHandler);

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});

const io = new Server(httpServer);
