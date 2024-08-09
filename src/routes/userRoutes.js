const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

// Rota POST (/v1/user) para cadastro de usuário
router.post('/', userController.createUser);

// Rota PUT (/v1/user/:id) para atualizar dados do usuário
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Converta o ID para número
    const updatedData = req.body;

    // Encontrar o usuário
    const userIndex = dados.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualizar o usuário
    dados[userIndex] = { ...dados[userIndex], ...updatedData };

    // Responder com sucesso sem conteúdo
    res.status(204).send();
});

// Rota DELETE (/v1/user/:id) para excluir um usuário
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Converta o ID para número

    // Encontrar o índice do usuário
    const userIndex = dados.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Excluir o usuário
    dados.splice(userIndex, 1);

    // Responder com sucesso sem conteúdo
    res.status(204).send();
});

//Routes > Controller > Services > Model

module.exports = router;