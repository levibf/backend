const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Rota para buscar todos as categorias
router.get('/', categoriesController.getCategories);

//Rota para buscar categoria por ID
router.get('/:id', categoriesController.getCategoryById);

// Rota POST (/v1/category) para cadastro de uma categoria
router.post('/', categoriesController.createCategory);

// Rota PUT (/v1/category/:id) para atualizar dados da categoria
router.put('/:id', categoriesController.updateCategory);

// Rota DELETE (/v1/category/:id) para excluir uma categoria
router.delete('/:id', categoriesController.deleteCategory);

// Estrutura das rotas
// Routes > Controller > Services > Model

module.exports = router;
