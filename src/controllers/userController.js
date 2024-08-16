const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userServices = require('../services/userServices');
const User = require('../models/user');

// Função para gerar o token JWT
async function generateToken(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Usuário não encontrado:', email); // Adicione este log
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    console.log('Usuário encontrado:', user.email); // Adicione este log

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Senha incorreta para o email:', email); // Adicione este log
      return res.status(400).json({ message: 'Email ou senha incorretos.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no servidor:', error); // Log para capturar erros
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
}


async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Tempo de expiração do token
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
}

// Função para obter todos os usuários
const getUsers = (req, res) => {
  userServices.getUsers(req, res);
};

// Função para obter um usuário por ID
const getUserById = (req, res) => {
  userServices.getUserById(req, res);
};

// Função para criar um novo usuário
const createUser = (req, res) => {
  userServices.createUser(req, res);
};

// Função para atualizar um usuário
const updateUser = (req, res) => {
  userServices.updateUser(req, res);
};

// Função para excluir um usuário
const deleteUser = (req, res) => {
  userServices.deleteUser(req, res);
};

// Exportando as funções
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  generateToken,
  login
};
