const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middlewares/authMiddleware');

productRouter.get('/search', productController.getProduct);

productRouter.get('/:id', productController.getProductById);

productRouter.post('/', authenticateToken, productController.createProduct);

productRouter.put('/:id', authenticateToken, productController.updateProduct);

productRouter.delete('/:id', authenticateToken, productController.deleteProduct);

// Estrutura das rotas
// Routes > Controller > Services > Model

module.exports = productRouter;
