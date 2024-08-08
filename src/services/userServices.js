const User = require('../models/user');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const getUsers = (req, res) => {
    User.findAll()
    .then(User => {
        res.json(User);
    })
    .catch(erro => {
        res.json(erro);
    })
}

const createUser = (req, res) => {
    const { primeiroNome, sobreNome, email, senha } = req.body;
    const saltRounds = 10;
    //Senha Criptografada
    bcrypt.hash(senha, saltRounds)
    .then(senhaCriptografada => {
        return User.create({
            primeiroNome: primeiroNome,
            sobreNome: sobreNome,
            email: email,
            senha: senhaCriptografada
        });
    })
    .then(gato =>{
        res.json({
            message: 'Usuario criado com sucesso',
            User: User
        });
    })
    .catch(erro => {
        console.log(erro);
        res.json({
            message: 'Erro ao criar usuário'
        })
    })
}

module.exports = {
  getUsers,
//   getUserById,
  createUser,
//   updateUser,
//   deleteUser
};