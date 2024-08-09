const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('banco_teste', 'root', '1234', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        connectTimeout: 10000
    }
});

module.exports = sequelize;
