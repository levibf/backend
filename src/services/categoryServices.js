const Category = require('../models/category');
const express = require('express');
const app = express();

app.use(express.json());

const getCategories = (req, res) => {
    Category.findAll()
    .then(category => {
        res.json(category);
    })
    .catch(erro => {
        res.json(erro);
    })
}

const createCategory = (req, res) => {
    const { name, slug, use_in_menu } = req.body;
        Category.create()
        .then(Category.create({
                name: name,
                slug: slug,
                use_in_menu: use_in_menu,
            })
        )
        .then(category => {
            res.json({
                message: 'Categoria criada com sucesso',
                category: category
            });
        })
        .catch(erro => {
            console.log(erro);
            res.json({
                message: 'Erro ao criar categoria'
            });
        });
}

module.exports = {
    getCategories,
    createCategory
}