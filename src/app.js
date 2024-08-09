const express = require('express');
const router = express.Router();

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const productRouter = require('./routes/productsRoutes');

// Rota GET para a página inicial
router.get('/', (req, res) => {
    res.send('Página Inicial');
});

// Usar rotas
router.use('/v1/user', userRoutes);
router.use('/v1/categories', categoriesRoutes);
router.use('/v1/products', productRouter);

module.exports = router;
