import { Router } from "express";
import ProductDaoMongoDB from "../daos/mongoDB/products.dao.js";
const prodDao = new ProductDaoMongoDB(); 

const router = Router();

router.get('/', async (req, res) => {
        res.render('home');
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