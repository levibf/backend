// Importa o módulo Express
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta em que o servidor vai rodar
const port = 3000;

// Importações de rotas
const routes = require('./app');

// Uso das rotas
app.use('', routes);

// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`Servidor está rodando na URL http://localhost:${port}`);
});