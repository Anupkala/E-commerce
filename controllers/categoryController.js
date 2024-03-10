import Category from "../models/category";

 export const getAllCategories= async (req, res) => {
    try {
      const categories = await Category.findAll();
     return res.json({ success: true, categories });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message });
    }
  };
