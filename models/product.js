import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';
import Category from "./category.js";

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  quantityAvailable: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 1,
  },
  productId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
   category_id: {
   type: DataTypes.UUID,
   allowNull: false,
  }

},{
    tableName: 'Product',
    timestamps:false
});


export default Product;
