const { DataTypes } = require('sequelize');
const Product = require('./product');
const sequelize = require('../config/database'); // ajuste o caminho conforme sua estrutura

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
});

Image.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Image, { foreignKey: 'productId' });

module.exports = Image;
