import Cart from '../models/cart.js';
import Product from '../models/product.js';

export const addToCart = async (req, res) => {
  const  cartId  = req.params.cart_id;

  const cart_id = cartId.replace(':', '');

  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findByPk(cart_id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    const product = await Product.findByPk(productId);
       
    let item = JSON.parse(cart.items);
     if (item.hasOwnProperty(productId)) {
        let totalItemInCart=quantity+item[productId];
        if(product.quantityAvailable>= totalItemInCart){ 
       item[productId] += quantity;
      cart.items = JSON.stringify(item);
      await cart.save();
      return res.status(201).json({ message: 'Product added to cart successfully', cart });
      } 
   else{
      return res.status(404).json({ error: 'This quantity is not available please add less quantity' });
     }
   } else {
        if(product.quantityAvailable>= quantity){ 
       item[productId] = quantity;
      cart.items = JSON.stringify(item);
      await cart.save();
      return res.status(201).json({ message: 'Product added to cart successfully', cart });
      } 
   else{
      return res.status(404).json({ error: 'This quantity is not available please add less quantity' });
     }
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCart = async (req, res) => {
  const cartId  = req.params.cart_id;
  const product_id = req.params.productId;
  const cart_id = cartId.replace(':','');
  const productId = product_id.replace(':','');
 
  const { quantity } = req.body;
  try {
    let cart = await Cart.findByPk(cart_id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    let item = JSON.parse(cart.items);
    const cartItem =item.hasOwnProperty(productId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }
    const product = await Product.findByPk(productId);
    let totalItemInCart=quantity+item[productId];
    if(product.quantityAvailable>=totalItemInCart){
    item[productId] = quantity;
    cart.items = JSON.stringify(item);
    await cart.save();
    return res.json({ message: 'Cart item quantity updated successfully', cart });
    }
    else{
      return res.status(404).json({ error: 'This quantity of product is not available' });
  }
  } catch (error) {
    console.error(error);
     return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removeFromCart = async (req, res) => {
  const cartId  = req.params.cart_id;
  const product_id = req.params.productId;  
  const cart_id = cartId.replace(':', '');
  const productId = product_id.replace(':', '');

  try {
    let cart = await Cart.findByPk(cart_id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    let items = JSON.parse(cart.items);
    const updatedItems = {};
    for (const key in items) {
      if (key !== productId) {
        updatedItems[key] = items[key];
      }
    }
    cart.items = JSON.stringify(updatedItems);
    await cart.save();
    return res.json({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const viewCart= async(req,res) =>{
  const  cartId  = req.params.cart_id;
  const cart_id = cartId.replace(':', '');
  try{
    let cart = await Cart.findByPk(cart_id);
    if(!cart){
      return res.status(404).json({ error: 'Cart not found' });
    }
    const products = [];
    let items = JSON.parse(cart.items);
for (const productId in items) {
    const product = await Product.findByPk(productId);
    products.push({
        productId: product.productId,
        productName: product.title,
        price: product.price,
        quantity: items[productId]
    });
}

    return res.json({ message: 'This is your cart', products });
  }
  catch{
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}

export const clearCart = async (req, res) => {
  const  cartId  = req.params.cart_id;
  const cart_id = cartId.replace(':', '');
  try {
    let cart = await Cart.findByPk(cart_id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    cart.items = '{}';
    await cart.save();
    return res.json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
