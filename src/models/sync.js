const sequelize = require('../config/database');
const User = require('./user');
const Category = require('./category');
const Product = require('./product');
const Image = require('./image');
const ProductOptions = require('./product_options');
const ProductCategories = require('./product_categories');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Cuidado: force: true irá recriar as tabelas
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

syncDatabase();