import { useDispatch, useSelector } from 'react-redux';
import { toggleCategory, setPriceRange, setSortBy, resetFilters } from '../store/filtersSlice';

export default function Filters() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  const { selectedCategories, priceRange, sortBy } = useSelector((state) => state.filters);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Filters</h2>
      
      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center bg-white text-black p-1 rounded">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-white text-black"
                checked={selectedCategories.includes(category)}
                onChange={() => dispatch(toggleCategory(category))}
              />
              <span className="ml-3 text-sm text-black">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600">Price Range</h3>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">Min</label>
            <input
              type="number"
              placeholder="Min price"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
              value={priceRange.min}
              onChange={(e) =>
                dispatch(setPriceRange({ ...priceRange, min: e.target.value }))
              }
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">Max</label>
            <input
              type="number"
              placeholder="Max price"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
              value={priceRange.max}
              onChange={(e) =>
                dispatch(setPriceRange({ ...priceRange, max: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
        >
          <option value="">Default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="latest">Latest</option>
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => dispatch(resetFilters())}
        className="w-full bg-red-600 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
      >
        Reset Filters
      </button>
    </div>
  );
}
