import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import { fetchCategories } from './store/productsSlice';
import { fetchCart } from './store/cartSlice';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notifications */}
      <Toaster />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">E-Commerce Store</h1>
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Filters */}
          <div className="col-span-1">
            <Filters />
          </div>

          {/* Product Grid */}
          <div className="col-span-3">
            <ProductGrid />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm">
        <div className="container py-4">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} E-Commerce Store. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} setOpen={setIsCartOpen} />
    </div>
  );
}

export default App;
