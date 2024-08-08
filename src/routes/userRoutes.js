const express = require('express');
const router = express.Router();

// Dados fictícios para simular um banco de dados
let dados = [
    { id: 1, firstname: "João", surname: "Silva", email: "joao.silva@example.com" },
    { id: 2, firstname: "Maria", surname: "Oliveira", email: "maria.oliveira@example.com" },
    { id: 3, firstname: "Carlos", surname: "Pereira", email: "carlos.pereira@example.com" },
    { id: 4, firstname: "Ana", surname: "Souza", email: "ana.souza@example.com" },
    { id: 5, firstname: "Pedro", surname: "Costa", email: "pedro.costa@example.com" },
    { id: 6, firstname: "Misa", surname: "Costa", email: "pedro.costa@example.com", senha: "MisaLindo" }
    
    
];

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);  // Converta o ID para número
    const user = dados.find(user => user.id === id);
    if (user) {
        res.status(200).json(user);  // Retorne o usuário encontrado
    } else {
        res.status(404).send('Usuário não encontrado');  // Status 404 para "não encontrado"
    }
});

// Rota POST (/v1/user) para cadastro de usuário
router.post('/', (req, res) => {
    const userData = req.body;

    // Gerar um novo ID para o usuário (baseado no último ID existente)
    const newId = dados.length ? Math.max(...dados.map(user => user.id)) + 1 : 1;
    const newUser = { id: newId, ...userData };

    // Adicionar o novo usuário aos dados
    dados.push(newUser);

    // Responder com sucesso
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: newUser });
});

// Rota PUT (/v1/user/:id) para atualizar dados do usuário
router.put('/:id', verifyAuthToken, (req, res) => {
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
router.delete('/:id', verifyAuthToken, (req, res) => {
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