// controllers/authController.js
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Cart from '../models/cart.js';

export const registerUser = async (req, res) => {
  try {
    const { username,email, password } = req.body;
    const existingUser  = await User.findOne({ where: { email } });
    if(existingUser ){
     return res.status(404).json({ error: 'User already exists' });   
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({ username,email, password: hashedPassword });
    const cart=await Cart.create({ userId: user.userId ,items: '{}'});

    return res.status(201).json({ message: `${user.username} you have registered successfully. Please login.`,cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username,email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.userId }, 'secret', { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
