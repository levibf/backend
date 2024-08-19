// Importa o módulo Express
const express = require('express');
// const listEndpoints = require('express-list-endpoints');
const sequelize = require('./config/database');
const Cors = require('./middlewares/corsMiddleware')

// Importações de rotas
const routes = require('./app');

// Cria uma instância do aplicativo Express
const app = express();

// Uso de json para repassar para as próximas rotas
app.use(express.json());

app.use(Cors);

// Define a porta em que o servidor vai rodar
const port = 3000;

// Uso das rotas
app.use('/', routes);

// Visualizar rotas
// console.log(listEndpoints(routes))

//Inicialização do banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso com o banco de dados')
        // Inicia o servidor na porta definida
        app.listen(port, () => {
            console.log(`Servidor está rodando na URL http://localhost:${port}`);
        });
    })
    .catch(err => console.error('Erro ao estabelecer conexão com o banco de dados:', err));