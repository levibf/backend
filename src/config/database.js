const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'user', 'password', {
    host: 'host_url',
    port: 5432, // ou a porta correspondente ao seu banco de dados
    dialect: 'mysql', // ou 'mysql', dependendo do seu banco de dados
    logging: false, // Defina como true se você quiser ver logs SQL
});

module.exports = sequelize;