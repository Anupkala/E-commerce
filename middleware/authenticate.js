import jwt from 'jsonwebtoken';
import Cart from "../models/cart"
export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.userId;
     if (req.params.userId && req.params.userId !== req.user) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
     if (req.params.cart_id) {
      const cart =  Cart.findByPk(req.params.cart_id);
       if (!cart) {
      return res.status(404).json({ error: 'Cart Id not found' });
    }
    if(cart.userId!==req.user){
         return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
