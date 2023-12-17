import { Router } from "express";
import fs from 'fs';

const router = Router();
const path = 'src/data/products.json';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, category, sortOrder } = req.query;
    const response = await service.getAll(page, limit, category, sortOrder);
    res.status(200).json(response);
  } catch (error) {
    next(error.message);
  }
};

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

router.get('/chat', (req, res) => {
    res.render('chat')
});


export default router;