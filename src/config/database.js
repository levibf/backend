require('dotenv').config()

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.RAILWAY_PRIVATE_DOMAIN,
    port: process.env.MYSQLPORT,
    dialect: 'mysql',
    logging: false, // Defina como true se você quiser ver logs SQL
});

module.exports = sequelize;