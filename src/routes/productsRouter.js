import { Router } from 'express';
import ProductManager from '../manager/productManager.js';
import { __dirname } from '../path.js';
import { productValidator } from '../middlewares/productValidator.js';

const router = Router();
const productManager = new ProductManager(` ${__dirname}/database/products.json`);


router.get('/', async (req, res,next) => {
    try {
        const products = await productManager.getProducts();
        let { limit } = req.query;
        let datos;
        if (limit) {
            datos = products.slice(0, parseInt(limit));
        } else {
            datos = products;
        }
        res.status(200).json(datos)
    } catch (error) {
       console.log(error)
        next(error);
    }
})


router.get('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(parseInt(pid));
        if (!product) {
            res.status(404).json({ msg: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        next(error);
    }
})

router.post('/', productValidator, async (req, res, next) => {
    try {
        const product = await productManager.addProducts(req.body);
        if (!product) {
            res.status(400).json({ msg: 'Product already exists' });
        } else {
            res.status(201).json(product);
        }
    } catch (error) {
        next(error);
    }
})

router.put('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params;
        const productUpdate = await productManager.updateProduct(parseInt(pid), req.body);
        if (!productUpdate) {
            res.status(404).json({ msg: 'Error updating product' });
        } else {
            res.status(200).json(productUpdate);
        }
    } catch (error) {
        next();
    }
})

router.delete('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params;
        const productDelete = await productManager.deleteProduct(parseInt(pid));
        if (!productDelete) {
            res.status(404).json({ msg: 'Error deleting product' });
        } else {
            res.status(200).json({ msg: `Product id: ${id} deleted` });
        }
    } catch (error) {
        next();
    }
})


export default router;