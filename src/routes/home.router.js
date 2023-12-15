import { Router } from "express";
import fs from 'fs';

const router = Router();
const path = 'src/data/products.json';

router.get('/', async (req, res) => {       
    res.render('home');
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

router.get('/chat', (req, res) => {
    res.render('chat')
});


export default router;