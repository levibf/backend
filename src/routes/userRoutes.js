const express = require('express');
const router = express.Router();

// Dados fictícios para simular um banco de dados
let dados = [
    { id: 1, firstname: "João", surname: "Silva", email: "joao.silva@example.com" },
    { id: 2, firstname: "Maria", surname: "Oliveira", email: "maria.oliveira@example.com" },
    { id: 3, firstname: "Carlos", surname: "Pereira", email: "carlos.pereira@example.com" },
    { id: 4, firstname: "Ana", surname: "Souza", email: "ana.souza@example.com" },
    { id: 5, firstname: "Pedro", surname: "Costa", email: "pedro.costa@example.com" }
];

// Função para validar a requisição
function validateUserData(data) {
    const { firstname, surname, email } = data;
    if (!firstname || !surname || !email) {
        return false;
    }
    // Adicione mais validações conforme necessário (e.g., formato de e-mail)
    return true;
}

// Middleware para verificar o token de autorização
function verifyAuthToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token || token !== 'valid-token') { // Exemplo de validação de token
        return res.status(401).json({ error: 'Token de autorização inválido ou não fornecido' });
    }
    next();
}

// Rota PUT (/v1/user/:id) para atualizar dados do usuário
router.put('/v1/user/:id', verifyAuthToken, (req, res) => {
    const id = parseInt(req.params.id, 10); // Converta o ID para número
    const updatedData = req.body;

    // Validação dos dados do usuário
    if (!validateUserData(updatedData)) {
        return res.status(400).json({ error: 'Dados da requisição inválidos' });
    }

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
router.delete('/v1/user/:id', verifyAuthToken, (req, res) => {
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

module.exports = router;