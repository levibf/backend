// models/user.js
const { DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const sequelize = require('../config/database'); // ajuste o caminho conforme sua estrutura

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Antes de salvar o usuário, faça o hash da senha
// User.beforeCreate(async (user, options) => {
//   if (user.password) {
//     user.password = await bcrypt.hash(user.password, 10);
//   }
// });

module.exports = User;
