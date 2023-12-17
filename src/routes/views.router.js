import { Router } from "express";
//import fs from "fs";
import ProductMongoDB from "../daos/mongoDB/products.dao.js";
const prodDao = new ProductMongoDB();

//const path = "src/data/products.json"

const router = Router();

/* router.get('/', async (req, res) => {
    let productsJSON = await fs.promises.readFile(path, "utf-8");
    let products = JSON.parse(productsJSON);
    res.render('home', { products });
}); */


router.get('/', async (req, res) => {
    try {
        const result = await prodDao.getAll();
        const products = result.payload.products;
        // console.log(products);
        res.render('home', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

router.get('/chat', (req, res) => {
    res.render('chat')
});

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/profile', (req, res)=>{
    res.render('profile')
})

router.get('/admin-profile', (req, res)=>{
    res.render('admin-profile')
})

router.get('/register-error', (req, res)=>{
    res.render('register-error')
})

export default router; 