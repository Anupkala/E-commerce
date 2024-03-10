import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';
import { v4 as uuidv4 } from 'uuid';

const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.UUID, 
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  items: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},{
    tableName: 'Cart',
    timestamps:false
});

export default Cart;
