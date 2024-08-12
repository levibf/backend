const Category = require('../models/category');
const express = require('express');
const app = express();

app.use(express.json());

const getCategories = (req, res) => {
    Category.findAll()
    .then(category => {
        res.status(200).json(category);
    })
    .catch(erro => {
        res.status(500).json({ message: 'Erro ao buscar categorias', erro });
    })
}

const getCategoryById = (req, res) => {
    const id = req.params.id;
    Category.findByPk(id)
        .then(category => {
            if (!category) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.status(200).json(category);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao buscar categoria', erro });
        });
}

const createCategory = (req, res) => {
    const { name, slug, use_in_menu } = req.body;

    if (!name || !slug || !use_in_menu) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
        Category.create({
                name: name,
                slug: slug,
                use_in_menu: use_in_menu,
        })
        .then(category => {
            res.status(201).json({ message: 'Categoria criada com sucesso', category: category });
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ message: 'Erro ao criar categoria' });
        });
}

const updateCategory = (req, res) => {
    const id = req.params.id;
    const { name, slug, use_in_menu } = req.body;

    if (!name && !slug && !use_in_menu) {
        return res.status(400).json({ message: 'Pelo menos um campo deve ser fornecido para atualização da categoria' });
    }

    const updateData = { name, slug, use_in_menu };
    
        Category.update(updateData, {
            where: { id: id }
        })
            .then(result => {
                if (result[0] === 0) {
                    return res.status(404).json({ message: 'Usuário não encontrado' });
                }
                res.sendStatus(204);
            })
            .catch(erro => {
                res.status(500).json({ message: 'Erro ao atualizar usuário', erro });
            });
};

const deleteCategory = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.sendStatus(204);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao deletar categoria', erro });
        });
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}