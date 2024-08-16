const productServices = require('../services/productsServices');

// Função para obter todos os usuários
const getProduct = (req, res) => {
  productServices.getProduct(req, res);
};

// Função para obter um usuário por ID
const getProductById = (req, res) => {
    productServices.getProductById(req, res);
};

// Função para criar um novo usuário
const createProduct = (req, res) => {
    productServices.createProduct(req, res);
};

// Função para atualizar um usuário
const updateProduct = (req, res) => {
    productServices.updateProduct(req, res);
};

// Função para excluir um usuário
const deleteProduct = (req, res) => {
    productServices.deleteProduct(req, res);
};

// Exportando as funções
module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};