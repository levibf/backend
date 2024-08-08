const express = require('express');
const router = express.Router();

// Importar rotas de usuário
const userRoutes = require('./routes/userRoutes');

// Rota GET para a página inicial
router.get('/', (req, res) => {
    res.send('Página Inicial');
});

// Usar rotas de usuário
router.use('/v1/user', userRoutes);

module.exports = router;
