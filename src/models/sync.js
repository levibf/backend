// sync.js
const sequelize = require('./config/database');
const User = require('./models/user');
const Category = require('./models/category');
const Product = require('./models/product');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Cuidado: force: true irá recriar as tabelas
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

syncDatabase();
