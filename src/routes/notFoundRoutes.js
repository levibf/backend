const express = require('express');
const notFoundRouter = express.Router();

const notFound = (req, res) => {
    res.status(404).json({ message: 'Endereço não encontrado' });
}

notFoundRouter.get('/*', notFound);

notFoundRouter.post('/*', notFound);

notFoundRouter.put('/*', notFound);

notFoundRouter.delete('/*', notFound);

module.exports = notFoundRouter;