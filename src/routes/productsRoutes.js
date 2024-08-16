const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');

// Rota para buscar todos os usuários
productRouter.get('/', productController.getProduct);

//Rota para buscar por usuário por ID
productRouter.get('/:id', productController.getProductById);

// Rota POST (/v1/user) para cadastro de usuário
productRouter.post('/', productController.createProduct);

// Rota PUT (/v1/user/:id) para atualizar dados do usuário
productRouter.put('/:id', productController.updateProduct);

// Rota DELETE (/v1/user/:id) para excluir um usuário
productRouter.delete('/:id', productController.deleteProduct);

// Estrutura das rotas
// Routes > Controller > Services > Model

module.exports = productRouter;
