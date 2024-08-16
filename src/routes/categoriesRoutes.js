const express = require('express');
const categoriesRouter = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Rota para buscar todos as categorias
categoriesRouter.get('/search', categoriesController.getCategories);

//Rota para buscar categoria por ID
categoriesRouter.get('/:id', categoriesController.getCategoryById);

// Rota POST (/v1/category) para cadastro de uma categoria
categoriesRouter.post('/', categoriesController.createCategory);

// Rota PUT (/v1/category/:id) para atualizar dados da categoria
categoriesRouter.put('/:id', categoriesController.updateCategory);

// Rota DELETE (/v1/category/:id) para excluir uma categoria
categoriesRouter.delete('/:id', categoriesController.deleteCategory);

// Estrutura das rotas
// Routes > Controller > Services > Model

module.exports = categoriesRouter;
