const User = require('../models/user');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

// app.use(express.json());

const getUsers = (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users);
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
            res.status(200).json(user);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao buscar usuário', erro });
        });
};

const createUser = (req, res) => {
    // console.log(req.body);
    const { firstname, surname, email, password, confirmPassword } = req.body;

    if (!firstname || !surname || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // const userExistente = User.findOne({ where: { email } });
    // // console.log(userExistente)
    // if (!userExistente) {
    //     return res.status(400).json({ error: 'Email já está em uso.' });
    // }

    const saltRounds = 10;

    // Verifica se as senhas são iguais
    if (password === confirmPassword) {
        bcrypt.hash(password, saltRounds)
            .then(senhaCriptografada => {
                return User.create({
                    firstname: firstname,
                    surname: surname,
                    email: email,
                    password: senhaCriptografada
                });
            })
            .then(user => {
                res.status(201).json({
                    message: 'Usuário criado com sucesso',
                    user: user
                });
            })
            .catch(erro => {
                console.log(erro);
                res.status(500).json({ message: 'Erro ao criar usuário', erro });
            });
    }
};

const updateUser = (req, res) => {
    const id = req.params.id;
    const { firstname, surname, email } = req.body;

    // Verifica se pelo menos um campo foi fornecido para atualização
    if (!firstname && !surname && !email) {
        return res.status(400).json({ message: 'Pelo menos um campo (firstname, surname ou email) deve ser fornecido para atualização' });
    }

    const updateData = { firstname, surname, email };
    User.update(updateData, {
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

const deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.sendStatus(204);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao deletar usuário', erro });
        });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
