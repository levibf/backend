const userServices = require('../services/userServices');

// Função para obter todos os usuários
const getUsers = (req, res) => {
  userServices.getUsers(req, res);
};

// Função para obter um usuário por ID
const getUserById = (req, res) => {
  userServices.getUserById(req, res);
};

// Função para criar um novo usuário
const createUser = (req, res) => {
  userServices.createUser(req, res);
};

// Função para atualizar um usuário
const updateUser = (req, res) => {
  userServices.updateUser(req, res);
};

// Função para excluir um usuário
const deleteUser = (req, res) => {
  userServices.deleteUser(req, res);
};

// Exportando as funções
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
