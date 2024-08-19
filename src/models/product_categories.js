const { DataTypes } = require('sequelize');
const Product = require('./product');
const Category = require('./category');
const sequelize = require('../config/database'); // ajuste o caminho conforme sua estrutura

const ProductCategories = sequelize.define('ProductCategories', {
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    }
}, {
    timestamps: true,
});

// Definindo as associações corretamente
Product.belongsToMany(Category, { through: ProductCategories, foreignKey: 'product_id' });
Category.belongsToMany(Product, { through: ProductCategories, foreignKey: 'category_id' });

module.exports = ProductCategories;
