const { Sequelize } = require('sequelize');

//banco railway 1
// const sequelize = new Sequelize('railway', 'root', 'XowovCXFTKLJzjvpdUHuCHAMkVDsNtLE', {
//     host: 'monorail.proxy.rlwy.net',
//     port: 56321,
//     dialect: 'mysql',
//     logging: false,
//     dialectOptions: {
//         connectTimeout: 10000
//     }
// });

//banco railway 2
// const sequelize = new Sequelize('railway', 'root', 'tqDQWuMddtixyhCdlEdcCVmQAMqzbkoS', {
//     host: 'roundhouse.proxy.rlwy.net',
//     port: 53731,
//     dialect: 'mysql',
//     logging: false,
//     dialectOptions: {
//         connectTimeout: 10000
//     }
// });

// Banco locals
const sequelize = new Sequelize('banco_teste', 'root', '1234', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        connectTimeout: 10000
    }
});


// src/config/database.js

const insert = async (table, data) => {
    // Simulação real ou lógica de banco de dados
    return { id: 1, ...data };
  };
  
  module.exports = {
    insert
  };
  

module.exports = sequelize;
