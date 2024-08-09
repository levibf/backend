// Importa o módulo Express
require('dotenv').config()
const express = require('express');
const listEndpoints = require('express-list-endpoints');
const sequelize = require('./config/database');

// Cria uma instância do aplicativo Express
const app = express();
app.use(express.json());

// Define a porta em que o servidor vai rodar
const port = 3000;

// Importações de rotas
const routes = require('./app');

// Uso das rotas
app.use('/', routes);

sequelize.sync()
    .then(() => console.log('Banco de dados sincronizado'))
    .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`Servidor está rodando na URL http://localhost:${port}`);
});