const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Rota para buscar todos os usuários
router.get('/', userController.getUsers);

//Rota para buscar por usuário por ID
router.get('/:id', userController.getUserById);

// Rota POST (/v1/user) para cadastro de usuário
router.post('/', userController.createUser);

// Rota PUT (/v1/user/:id) para atualizar dados do usuário
router.put('/:id', userController.updateUser);

// Rota DELETE (/v1/user/:id) para excluir um usuário
router.delete('/:id', userController.deleteUser);

// Estrutura das rotas
// Routes > Controller > Services > Model

module.exports = router;