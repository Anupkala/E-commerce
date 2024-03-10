import  Product  from '../models/product.js';


  export const getProductsByCategory = async (req, res) => {
    const { category_id } = req.query;
    try {
      const products = await Product.findAll({ where: { category_id } });
       return res.json({ success: true, products });
    } catch (error) {
       return res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
    }
  };

   export const getProductById = async (req, res) => {
    const Id  = req.params.productId;
    const productId = Id.replace(':', '');

    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
    return  res.json({ success: true, product });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch product', error: error.message });
    }
  };
