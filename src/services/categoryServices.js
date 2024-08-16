const Category = require('../models/category');
const express = require('express');
const app = express();

app.use(express.json());

const getCategories = async (req, res) => {
    try {
        const { limit = 12, page = 1, fields, use_in_menu } = req.query;

        // Configurar opções de busca
        const options = {};

        // Limitar os campos retornados
        if (fields) {
            options.attributes = fields.split(',');
        }

        // Filtrar categorias que podem aparecer no menu
        if (use_in_menu) {
            options.where = { use_in_menu: use_in_menu === 'true' };
        }

        // Configurar paginação
        let limitValue = parseInt(limit, 10);
        let pageValue = parseInt(page, 10);

        // Validação dos valores de `limit` e `page`
        if (isNaN(limitValue) || limitValue < 1) {
            options.limit = 12; // Valor padrão
        } else if (limitValue !== -1) {
            options.limit = limitValue;
            options.offset = (isNaN(pageValue) || pageValue < 1 ? 1 : pageValue - 1) * options.limit;
        }

        // Buscar categorias
        const categories = await Category.findAll(options);

        // Responder com categorias e informações de paginação
        res.status(200).json({
            categories,
            total: categories.length,
            limit: limitValue,
            page: pageValue
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar categorias', error });
    }
};

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




// src/services/categoryService.js

async function adicionarCategoria(nome, db = require('../config/database')) {
    if (!nome) {
      throw new Error('Nome da categoria é obrigatório');
    }
    // Adiciona a categoria ao banco de dados
    const resultado = await db.insert('categorias', { nome });
    return resultado;
  }
  
  module.exports = adicionarCategoria;
  
  









module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}