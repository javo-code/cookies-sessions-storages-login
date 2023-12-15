import { Router } from "express";
const router = Router();
import {
  login,
  logout,
  visit,
  infoSession,
} from "../controllers/cookie.controller.js";
import { validateLogIn } from "../middlewares/middlewares.js";

router.post("/login", login);

router.get("/info", validateLogIn, infoSession);

router.get("/secret", validateLogIn, visit);

router.post("/logout", logout);

export default router;
