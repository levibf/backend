require('dotenv').config();
const { Sequelize } = require('sequelize');

// Determine the environment
const env = process.env.DB_ENV || 'production';

// Configuração para produção (Railway 1)
const productionConfig = {
    database: process.env.DB_NAME_PROD,
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    host: process.env.DB_HOST_PROD,
    port: parseInt(process.env.DB_PORT_PROD, 10),
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        connectTimeout: 10000
    }
};

// Configuração para teste (Railway 2)
const testConfig = {
    database: process.env.DB_NAME_TEST,
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    host: process.env.DB_HOST_TEST,
    port: parseInt(process.env.DB_PORT_TEST, 10),
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        connectTimeout: 10000
    }
};

// Exportar a instância do Sequelize com base no ambiente
const sequelize = new Sequelize(env === 'production' ? productionConfig : testConfig);


// src/config/database.js

const insert = async (table, data) => {
    // Simulação real ou lógica de banco de dados
    return { id: 1, ...data };
  };
  
  module.exports = {
    insert
  };
  

module.exports = sequelize;
