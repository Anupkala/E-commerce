import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';
import User from './user.js';

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
    userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Order Recieved',
  },
   products: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
},{
    tableName: 'Order',
    timestamps:false
});
Order.belongsTo(User, { foreignKey: 'userId' });
// Order.hasMany(Product, { foreignKey: 'orderId' });

export default Order;
