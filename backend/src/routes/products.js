import express from 'express';
import { getProducts, getProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', async (req, res) => {
  try {
    const product = req.body;
    const result = await req.db.collection('products').insertOne(product);
    res.status(201).json({ id: result.insertedId, ...product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
