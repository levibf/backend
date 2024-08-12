const categoryServices = require('../services/categoryServices');

// Função para obter todas as categorias
const getCategories = (req, res) => {
  categoryServices.getCategories(req, res);
};

// Função para obter uma categoria por ID
const getCategoryById = (req, res) => {
  categoryServices.getCategoryById(req, res);
};

// Função para criar uma nova categoria
const createCategory = (req, res) => {
  categoryServices.createCategory(req, res);
};

// Função para atualizar uma categoria
const updateCategory = (req, res) => {
  categoryServices.updateCategory(req, res);
};

// Função para excluir uma categoria
const deleteCategory = (req, res) => {
  categoryServices.deleteCategory(req, res);
};

// Exportando as funções
module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};