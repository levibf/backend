const User = require('../models/user');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const getUsers = (req, res) => {
    User.findAll()
        .then(users => {
            res.json(users);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao buscar usuários', erro });
        });
};

const getUserById = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.json(user);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao buscar usuário', erro });
        });
};

const createUser = (req, res) => {
    // console.log(req.body);
    const { primeiroNome, sobreNome, email, senha } = req.body;  // Certifique-se de que os nomes correspondem aos dados enviados

    if (!primeiroNome || !sobreNome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const saltRounds = 10;

    bcrypt.hash(senha, saltRounds)
        .then(senhaCriptografada => {
            return User.create({
                firstname: primeiroNome,  // Correspondente ao nome do campo no modelo
                surname: sobreNome,      // Correspondente ao nome do campo no modelo
                email: email,
                password: senhaCriptografada
            });
        })
        .then(user => {
            res.json({
                message: 'Usuário criado com sucesso',
                user: user
            });
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ message: 'Erro ao criar usuário', erro });
        });
};

module.exports = {
    getUsers,
    getUserById,  // Adicionado ao módulo exportado
    createUser,
};
