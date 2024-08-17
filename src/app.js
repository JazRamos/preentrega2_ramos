import express from 'express';
import routerCart from '../src/routes/cartRouter.js'
import productsRouter from '../src/routes/productsRouter.js';
import ProductManager from './manager/productManager.js';
import viewsRouter from "./routes/views.router.js";
import morgan from 'morgan';
import exphbs from "express-handlebars";
import { Server } from 'socket.io';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';

const productManager = new ProductManager(`${__dirname}/database/products.json`)

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const io = new Server(httpServer);

io.on('connection', async (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('disconnect', async () => {
        console.log('Cliente desconectado');
    });

    socket.on('addProduct', async (prod) => {
        try {
            const newProduct = await productManager.addProducts(prod);
            socket.emit('msgAddProduct', { success: true, product: newProduct });
            io.emit('getProducts', await productManager.getProducts());
        } catch (error) {
            socket.emit('msgAddProduct', { success: false, error: error.message })
        }
    })

    socket.on('deleteProduct', async (productId) => {
        try {
            await productManager.deleteProduct(productId);
            io.emit('getProducts', await productManager.getProducts());
        } catch (error) {
            socket.emit('msgDeleteProduct', { success: false, error: error.message });
        }
    });

    socket.emit('getProducts', await productManager.getProducts());
})

app.use('/static', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/', viewsRouter);
app.use('/api/carts', routerCart);
app.use('/api/products', productsRouter);
app.use(errorHandler);

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


