import { Router } from "express";
import ProductManager from "../manager/productManager.js";
import { __dirname } from "../path.js";

const productManager = new ProductManager(`${__dirname}/database/products.json`)
const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    let allProducts = await productManager.getProducts();
    res.render('index', { allProducts });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    let allProducts = await productManager.getProducts();
    res.render('realtimeproducts', {
        title: "Librería Arcoíris",
        products: allProducts
    });
})

export default viewsRouter;