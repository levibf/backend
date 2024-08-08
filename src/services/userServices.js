const User = require('../models/user');

const getUsers = (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

const createUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validações básicas
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Criação do usuário
  User.create({ firstName, lastName, email, password })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json({ error: err.message }));
};

const updateUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(user => {
      if (user) {
        return user.update(req.body)
          .then(updatedUser => res.json(updatedUser))
          .catch(err => res.status(400).json({ error: err.message }));
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(user => {
      if (user) {
        return user.destroy()
          .then(() => res.status(204).end())
          .catch(err => res.status(500).json({ error: err.message }));
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};