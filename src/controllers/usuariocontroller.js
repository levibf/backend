const User = require('../models/user');

// Função para obter todos os usuários
const getUser = (req, res) => {
  User.findAll()
    .then(User => res.json(User))
    .catch(err => res.status(500).json({ error: err.message }));
};

// Função para criar um novo usuário
const createUser = (req, res) => {
  User.create(req.body)
    .then(User => res.status(201).json(User))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Exportando as funções
module.exports = {
  getUser,
  createUser
};
