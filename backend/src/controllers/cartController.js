import { ObjectId } from 'mongodb';
import { cartItemSchema } from '../utils/validation.js';

// In-memory cart storage (in production, use Redis or database)
const carts = new Map();

// Production-ready error handling middleware
export const validateSession = (req, res, next) => {
  const sessionId = req.headers['session-id'];
  if (!sessionId) {
    return res.status(401).json({ 
      success: false,
      message: 'Session ID required',
      code: 'SESSION_ID_REQUIRED'
    });
  }
  next();
};

export const getCart = async (req, res) => {
  try {
    const sessionId = req.headers['session-id'];
    
    // In production, use Redis/database instead of Map
    const cart = carts.get(sessionId) || [];
    
    const cartWithDetails = await Promise.all(
      cart.map(async (item) => {
        try {
          const product = await req.db.collection('products').findOne({
            _id: new ObjectId(item.productId)
          }) || {
            title: 'Product unavailable',
            price: 0,
            image: 'https://via.placeholder.com/150'
          };

          return {
            ...item,
            product: {
              title: product.title,
              price: Number(product.price) || 0,
              image: product.image || 'https://via.placeholder.com/150'
            }
          };
        } catch (error) {
          console.error(`Failed to fetch product ${item.productId}:`, error);
          return {
            ...item,
            product: {
              title: 'Error loading product',
              price: 0,
              image: 'https://via.placeholder.com/150'
            }
          };
        }
      })
    );

    res.json({
      success: true,
      data: cartWithDetails
    });
  } catch (error) {
    console.error('Cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    await validateSession(req, res);
    
    const { error } = cartItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false,
        message: error.details[0].message,
        code: 'VALIDATION_ERROR'
      });
    }

    const { productId, quantity } = req.body;

    // Validate product exists
    const product = await req.db.collection('products').findOne({
      _id: new ObjectId(productId)
    });
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found',
        code: 'PRODUCT_NOT_FOUND'
      });
    }

    let cart = carts.get(req.headers['session-id']) || [];
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    carts.set(req.headers['session-id'], cart);
    
    // Return cart with product details, similar to getCart
    const cartWithDetails = await Promise.all(
      cart.map(async (item) => {
        try {
          const productDetails = await req.db.collection('products').findOne({
            _id: new ObjectId(item.productId)
          }) || {
            title: 'Product unavailable',
            price: 0,
            image: 'https://via.placeholder.com/150'
          };

          return {
            ...item,
            product: {
              title: productDetails.title,
              price: Number(productDetails.price) || 0,
              image: productDetails.image || 'https://via.placeholder.com/150'
            }
          };
        } catch (error) {
          console.error(`Failed to fetch product ${item.productId}:`, error);
          return {
            ...item,
            product: {
              title: 'Error loading product',
              price: 0,
              image: 'https://via.placeholder.com/150'
            }
          };
        }
      })
    );

    res.status(201).json({
      success: true,
      data: cartWithDetails
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    await validateSession(req, res);
    
    const { productId } = req.params;
    let cart = carts.get(req.headers['session-id']) || [];
    
    cart = cart.filter(item => item.productId !== productId);
    carts.set(req.headers['session-id'], cart);
    
    // Return cart with product details, similar to getCart
    const cartWithDetails = await Promise.all(
      cart.map(async (item) => {
        try {
          const productDetails = await req.db.collection('products').findOne({
            _id: new ObjectId(item.productId)
          }) || {
            title: 'Product unavailable',
            price: 0,
            image: 'https://via.placeholder.com/150'
          };

          return {
            ...item,
            product: {
              title: productDetails.title,
              price: Number(productDetails.price) || 0,
              image: productDetails.image || 'https://via.placeholder.com/150'
            }
          };
        } catch (error) {
          console.error(`Failed to fetch product ${item.productId}:`, error);
          return {
            ...item,
            product: {
              title: 'Error loading product',
              price: 0,
              image: 'https://via.placeholder.com/150'
            }
          };
        }
      })
    );

    res.json({
      success: true,
      data: cartWithDetails
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
};
