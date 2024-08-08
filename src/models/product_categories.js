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

Product.hasOne(ProductCategories);
Category.hasOne(ProductCategories);
ProductCategories.hasMany(Product, Category);

module.exports = ProductCategories;