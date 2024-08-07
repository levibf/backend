const express = require('express');
const app = express();
const router = express.Router();

//Imports
const userRoutes = require('./routes/userRoutes');

// Rota GET para a página inicial
router.get('/', (req, res) => {
    res.send('Página Inicial');  // Correção: use `res.send` para enviar uma resposta
});

//Usar rotas
app.use('/v1/user', userRoutes);

module.exports = router;