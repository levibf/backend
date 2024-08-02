const express = require('express');
const app = express();

// Criação de porta
const port = 3000;

const dados = [
    { id: 1, firstname: "João", surname: "Silva", email: "joao.silva@example.com" },
    { id: 2, firstname: "Maria", surname: "Oliveira", email: "maria.oliveira@example.com" },
    { id: 3, firstname: "Carlos", surname: "Pereira", email: "carlos.pereira@example.com" },
    { id: 4, firstname: "Ana", surname: "Souza", email: "ana.souza@example.com" },
    { id: 5, firstname: "Pedro", surname: "Costa", email: "pedro.costa@example.com" }
];

// Rota GET para a página inicial
app.get('/', (req, res) => {
    res.send('Página Inicial');  // Correção: use `res.send` para enviar uma resposta
});

// Rota GET (/users/:id)
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);  // Converta o ID para número
    const user = dados.find(user => user.id === id);
    if (user) {
        res.status(200).json(user);  // Correção: Retorne o usuário encontrado
    } else {
        res.status(404).send('Usuário não encontrado');  // Correção: Status 404 para "não encontrado"
    }
});

app.listen(port, () => {
    console.log(`Servidor está rodando na URL http://localhost:${port}`);
});
