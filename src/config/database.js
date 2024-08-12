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
    port: 3307,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        connectTimeout: 10000
    }
});

module.exports = sequelize;
