import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-hot-toast';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success(`${product.title} added to cart!`, {
          position: 'bottom-right',
          duration: 2000
        });
      })
      .catch(error => {
        toast.error(`Failed to add to cart: ${error.message}`, {
          position: 'bottom-right'
        });
      });
  };

  return (
    <div className="product-card">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="wishlist-button"
        >
          {isWishlisted ? (
            <HeartSolidIcon className="wishlist-icon text-red-500" />
          ) : (
            <HeartIcon className="wishlist-icon text-gray-600" />
          )}
        </button>
      </div>
      <div className="product-info">
        <div className="category-tag">{product.category}</div>
        <h3 className="product-title">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <span className="price-tag">
            ${product.price.toFixed(2)}
          </span>
          <div className="rating">
            <span>★</span>
            <span className="ml-1 text-sm text-gray-600">
              {product.rating?.rate || 0}
            </span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
