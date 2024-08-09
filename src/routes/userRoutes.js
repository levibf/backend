const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

// Rota para buscar todos os usuários
userRouter.get('/', userController.getUsers);

//Rota para buscar por usuário por ID
userRouter.get('/:id', userController.getUserById);

// Rota POST (/v1/user) para cadastro de usuário
userRouter.post('/', userController.createUser);

// Rota PUT (/v1/user/:id) para atualizar dados do usuário
userRouter.put('/:id', userController.updateUser);

// Rota DELETE (/v1/user/:id) para excluir um usuário
userRouter.delete('/:id', userController.deleteUser);

// Estrutura das rotas
// Routes > Controller > Services > Model

module.exports = userRouter;
