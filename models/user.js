import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';
import { v4 as uuidv4 } from 'uuid';
import Cart from './cart.js';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(), 
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
},{
  tableName: 'User',
  timestamps:false
});

User.hasOne(Cart, { foreignKey: 'userId' });

export default User;
