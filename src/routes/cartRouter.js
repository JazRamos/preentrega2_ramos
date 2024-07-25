import { Router } from "express";
import CartManager from "../manager/cartManager.js";
import { __dirname } from "../path.js";

const routerCart = Router();
const cartManager = new CartManager(`${__dirname}/database/carts.json`);

routerCart.get('/:cid', async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);
        res.json(cart);
        console.log(cart);
    } catch (error) {
        next(error);
    }
})


routerCart.post('/', async (req, res, next) => {
    try {
        const cartResp = await cartManager.createCart();
        res.json(cartResp);
    } catch (error) {
        next(error);
    }
})

routerCart.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const response = await cartManager.saveProductToCart(cid, parseInt(pid));
        res.json(response);
    } catch (error) {
        next(error)
    }

})



export default routerCart;