import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedCategories: [],
    priceRange: {
      min: '',
      max: ''
    },
    sortBy: '',
    currentPage: 1
  },
  reducers: {
    toggleCategory: (state, action) => {
      const category = action.payload;
      const index = state.selectedCategories.indexOf(category);
      if (index === -1) {
        state.selectedCategories.push(category);
      } else {
        state.selectedCategories.splice(index, 1);
      }
      state.currentPage = 1;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategories = [];
      state.priceRange = { min: '', max: '' };
      state.sortBy = '';
      state.currentPage = 1;
    }
  }
});

export const {
  toggleCategory,
  setPriceRange,
  setSortBy,
  setPage,
  resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
