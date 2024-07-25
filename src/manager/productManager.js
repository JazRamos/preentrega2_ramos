import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const path = "../database/products.json"; 

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                const getJSON = JSON.parse(products);
                return getJSON;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }
    async addProducts(object) {
        try {
            const product = {
                id: uuidv4(),
                status: true,
                ...object,
            };
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
           const findProdId = products.find((p) => p.id === id);
            if (!findProdId)return null;
             return findProdId;
        } catch (error) {
            console.log("No existe este producto");
        }
    }

    async updateProduct(id, campo, newValue) {
        try {
            const products = await this.getProducts();
            products.push(product => product.id === id);
            product[campo] = newValue;
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log('Nuevo producto agregado')
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteProduct() {
        try {
            const products = await this.getProducts();
            const product = products.splice(this.path);
            await fs.promises.writeFile(path, JSON.stringify(product));
            console.log("El producto fue eliminado");
        } catch (error) {
            console.log(error);
        }


    }
}




/* 
const prod1 = {
    id: 1,
    title: "Lapicera Bic Round Stic Azul x12u",
    description: "Caja por 12 unidades de lapiceras Bic línea Round Stic, color azul, trazo grueso.",
    price: 3945,
    thumbnail: "https: //res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapicera1_l3pehr.png",
    code: "1",
    stock: 10
};

const prod2 = {
    id: 2,
    title: "Lapiceras Bic Colores Cristal x10u",
    description: "Lapiceras Bic línea Cristal por 10 dolores surtidos, trazo grueso.",
    price: 7600,
    thumbnail: "https: //res.cloudinary.com/diklj3m6q/image/upload/v1705344747/lapicera2_k7isxg.png",
    code: "2",
    stock: 10
};
const prod3 = {
    id: 3,
    title: "Cuaderno Exito E7 Rayado",
    description: "Cuaderno Exito E7 espiralado tamaño A4. 60 hojas rayadas.",
    price: 5650,
    thumbnail: "https: //res.cloudinary.com/diklj3m6q/image/upload/v1705344747/cuaderno2_nbj6ye.png",
    code: "3",
    stock: 10
};
const prod4 = {
    id: 4,
    title: "Cuaderno Rivadavia ABC Rayado",
    description: "Cuaderno Rivadavia ABC espiralado tamaño A4. 100 hojas rayadas.",
    price: 7950,
    thumbnail: "https: //res.cloudinary.com/diklj3m6q/image/upload/v1705344747/cuaderno1_vd59wz.png",
    code: "4",
    stock: 10
};

const test = async () => {

    console.log(await prodManager.getProducts());
    prodManager.addProducts(prod1);
    prodManager.addProducts(prod2);
    prodManager.addProducts(prod3);
    prodManager.addProducts(prod4);
    console.log(await prodManager.getProductById(1));
    console.log(await prodManager.getProductById(6));
    await prodManager.updateProduct(2, "stock", 2);
    console.log(await prodManager.getProducts());

    //await prodManager.deleteProduct(1);
}

test(); */