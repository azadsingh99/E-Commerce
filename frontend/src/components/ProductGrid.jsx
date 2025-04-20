import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import ProductCard from './ProductCard';
import { setPage } from '../store/filtersSlice';

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { items, status, error, currentPage, totalPages } = useSelector(
    (state) => state.products
  );
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: filters.currentPage,
        category: filters.selectedCategories,
        minPrice: filters.priceRange.min,
        maxPrice: filters.priceRange.max,
        sort: filters.sortBy,
      })
    );
  }, [dispatch, filters]);

  if (status === 'loading') {
    return (
      <div className="grid-cols-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-lg h-80 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid-cols-4 mb-12">
        {items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <button
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-black border border-gray-300 hover:bg-gray-50'}`}
            disabled={currentPage === 1}
            onClick={() => dispatch(setPage(currentPage - 1))}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-black border border-gray-300 hover:bg-gray-50'}`}
            disabled={currentPage === totalPages}
            onClick={() => dispatch(setPage(currentPage + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
