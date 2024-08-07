// sync.js
const sequelize = require('./config/database');
const User = require('./models/user');
const Category = require('./models/category');
const Product = require('./models/product');
const Image = require('./models/image');
const ProductOptions = require('./models/product_options');
const ProductCategories = require('./models/product_categories');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Cuidado: force: true irá recriar as tabelas
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

syncDatabase();
