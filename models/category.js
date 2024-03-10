import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';
import Product from './product.js';

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  category_id: {
   type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  }
},
{
    tableName: 'Category',
    timestamps:false
});
Category.hasMany(Product, { foreignKey: 'category_id' });

export default Category;
