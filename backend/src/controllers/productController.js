import { ObjectId } from 'mongodb';
import { productSchema } from '../utils/validation.js';

export const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 9,
      category,
      minPrice,
      maxPrice,
      sort
    } = req.query;

    const query = {};
    if (category) {
      query.category = { $in: Array.isArray(category) ? category : [category] };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sortOptions = {};
    if (sort === 'price-low-high') sortOptions.price = 1;
    else if (sort === 'price-high-low') sortOptions.price = -1;
    else if (sort === 'latest') sortOptions.createdAt = -1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      req.db.collection('products')
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .toArray(),
      req.db.collection('products').countDocuments(query)
    ]);

    res.json({
      products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await req.db.collection('products').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
