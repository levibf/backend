const express = require('express');
const router = express.Router();
const app = express();

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const productRouter = require('./routes/productsRoutes');
const notFoundRouter = require('./routes/notFoundRoutes');

// Rota GET para a página inicial
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo',
    });
})

// Usar rotas
app.use('/v1/user', userRoutes);
app.use('/v1/category', categoriesRoutes);
app.use('/v1/product', productRouter);
app.use('/*', notFoundRouter);

module.exports = router;
module.exports = app;
