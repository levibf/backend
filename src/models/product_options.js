const { DataTypes } = require('sequelize');
const Product = require('./product');
const sequelize = require('../config/database'); // ajuste o caminho conforme sua estrutura

const ProductOptions = sequelize.define('ProductOptions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Product,
        key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shape: {
    type: DataTypes.ENUM('square','circle'),
    defaultValue: 'square',
  },
  radius: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.ENUM('text','color'),
    defaultValue: 'text',
  },
  values: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Product.hasOne(ProductOptions);
ProductOptions.hasOne(Product);

module.exports = ProductOptions;