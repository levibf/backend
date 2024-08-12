const express = require('express');
const cors = require('cors');

const app = express();

// Permitir todas as origens
app.use(cors());

// Ou permitir apenas um domínio específico
// app.use(cors({
//   origin: 'https://sitedocleitinho.com'
// }));

app.get('/', (req, res) => {
    res.send('Api projeto back-end');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta :3000');
});
