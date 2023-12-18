import { Router } from "express";
import ProductMongoDB from "../daos/mongoDB/products.dao.js";
const prodDao = new ProductMongoDB();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await prodDao.getAll();
    const products = response.payload.products;
    // console.log(products);
    res.render("home", { products });
  } catch (error) {
    console.error("Error getting products at views.router ::", error.message);
    res.status(500).send("Internal server error");
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


export default router; 