import { Router } from "express";
import { validateLogIn } from "../middlewares/validateLogin.js";
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

router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/login", async (req, res) => {
  try {
    const response = await prodDao.getAll();
    const products = response.payload.products;
    // console.log(products);
    res.render("profile", { products });
  } catch (error) {
    console.error(
      "Error getting products at profile views.router ::",
      error.message
    );
    res.status(500).send("Internal server error");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", validateLogIn, (req, res) => {
  
  
  const user = req.session.info;
    //REVISAR - NO FUNCA
    const userInfo = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
  };

  res.render("profile", userInfo);
});

router.get("/admin-profile", (req, res) => {
  res.render("admin-profile");
});

router.get("/register-error", (req, res) => {
  res.render("register-error");
});

export default router;