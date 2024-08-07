const express = require('express');
const router = express.Router();

// Rota GET para a página inicial
router.get('/', (req, res) => {
    res.send('Página Inicial');  // Correção: use `res.send` para enviar uma resposta
});

module.exports = router;