// Importa o módulo Express
const express = require('express');

//Criação de porta
const port = 3000

// Cria uma nova aplicação Express
const app = express();

// Importar rotas
const userRoutes = require('./routes/routes');

// Usar as rotas
app.use('/users', userRoutes);

// Inicia o servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor está rodando na URL http://localhost:${port}`);
});