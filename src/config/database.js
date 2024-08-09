const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('railway', 'root', 'XowovCXFTKLJzjvpdUHuCHAMkVDsNtLE', {
//     host: 'monorail.proxy.rlwy.net',
//     port: 56321,
//     dialect: 'mysql',
//     logging: false,
//     dialectOptions: {
//         connectTimeout: 10000
//     }
// });

// Banco locals
const sequelize = new Sequelize('banco_teste', 'root', '1234', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        connectTimeout: 10000
    }
});

module.exports = sequelize;
