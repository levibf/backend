const Product = require('../models/product');
const express = require('express');
const app = express();


const getProduct = (req, res) => {
    Product.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao buscar produtos', erro });
        });
};

const getProductById = (req, res) => {
    const id = req.params.id;
    Product.findByPk(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.json(product);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao buscar produto', erro });
        });
};

const createProduct = (req, res) => {

        // Dados do produto fornecidos na requisição
        const { enabled, name, slug, stock, description, price, price_with_discount } = req.body;

        // Valida os dados recebidos
        if (!name || !slug || stock === undefined || price === undefined || price_with_discount === undefined || category_ids) {
            return res.status(400).json({ message: 'Dados inválidos. Todos os campos são obrigatórios.' });
        }

        // Cria um objeto de produto com os dados fornecidos
       return Product.create = {
            enabled: enabled,
            name: name,
            slug: slug,
            stock: stock,
            description: description,
            price: price,
            price_with_discount: price_with_discount,
            category_ids,
        }

        // Sucesso
        .then(createProduct => {
            res.status(200).json({
                message: 'Produto criado com sucesso',
                product: createProduct
            });
        })

        .catch(error => {
            // Erro
            console.error('Erro ao criar produto:', error);
            res.status(500).json({
                message: 'Erro ao criar produto',
                error
            });
        })

    };
    

const updateProduct = (req, res) => {
    // ID do produto a ser atualizado
    const { id } = req.params;

    // Dados do produto fornecidos na requisição
    const { enabled, name, slug, stock, description, price, price_with_discount } = req.body;

    // Valida o ID
    if (!id) {
        return res.status(400).json({ message: 'ID do produto é necessário.' });
    }

    // Valida os dados fornecidos
    if (!name || !slug || stock === undefined || price === undefined || price_with_discount === undefined) {
        return res.status(400).json({ message: 'Dados inválidos. Todos os campos obrigatórios devem ser fornecidos.' });
    }

    // Encontra o produto a ser atualizado
    Product.findByPk(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            // Atualiza o produto com os dados fornecidos
            return product.update({ enabled, name, slug, stock, description, price, price_with_discount });
        })
        .then(updatedProduct => {
            // Sucesso
            res.status(200).json({
                message: 'Produto atualizado com sucesso',
                product: updatedProduct
            });
        })
        .catch(error => {
            // Erro
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({
                message: 'Erro ao atualizar produto',
                error
            });
        });
};

const deleteProduct = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted === 0) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.sendStatus(204);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao deletar produto', erro });
        });
};

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
