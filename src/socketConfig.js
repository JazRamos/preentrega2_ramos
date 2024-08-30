import { Server } from 'socket.io';

export const socketConfig = (httpServer) =>{
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
}) }