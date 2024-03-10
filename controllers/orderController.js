import Order from '../models/order.js';
import Cart from '../models/cart.js';
import Product from '../models/product.js';

export const placeOrder = async (req, res) => {
  const  user_id  = req.params.userId;
  const userId = user_id.replace(':', '');

  try {
    const cart = await Cart.findOne({ where: { userId } });
     if(cart.items==='{}'){
         return res.status(201).json({ message: 'Cart is Empty please add items', cart });
     }
    let products = JSON.parse(cart.items);
    let totalAmount=0;
   for (const productId in products) {
      const product = await Product.findByPk(productId);
      if (product) {
        const quantity = products[productId];
        totalAmount += product.price * quantity;
        product.quantityAvailable -= quantity;
        await product.save();
      }
    }
    products = JSON.stringify(products);
    const order = await Order.create({ userId, products,totalAmount });
    if (cart) {
      cart.items = "{}";
      await cart.save();
    }

   return res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get order history by user id
export const getOrderHistory = async (req, res) => {
 const userId = req.params.userId.replace(':', '');  
 try {
    const orders = await Order.findAll({ where: { userId } });
     if (!orders) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get order details by order id
export const getOrderById = async (req, res) => {
 const orderId = req.params.id.replace(':', '');  
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const cancelOrder= async(req,res) =>{
 const orderId = req.params.id.replace(':', '');  
 try{
    const order =await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if(order.status==="Order Recieved"){
        let products = JSON.parse(order.products);
        for (const productId in products) {
      const product = await Product.findByPk(productId);
      if (product) {
        const quantity = products[productId];
        product.quantityAvailable += quantity;
        await product.save();
      }
    }
       order.status="Cancelled";
       await order.save();
       return res.status(201).json({ message: 'Order Cancelled', order });
    }
    else{
       return res.status(201).json({ message: 'Order Shipped cannot be cancelled', order });
    }
 }
 catch(error){
  console.log(error);
  return res.status(404).json({error:'Internal Server Error'});
 }
};