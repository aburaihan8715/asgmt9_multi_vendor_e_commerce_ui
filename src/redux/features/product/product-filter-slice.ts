import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilterState {
  searchQuery: string;
  sortValue: string;
  priceRangeValue: string;
  shopValue: string;
  categoryValue: string;
}

const initialState: IFilterState = {
  searchQuery: '',
  sortValue: '',
  priceRangeValue: '',
  shopValue: '',
  categoryValue: '',
};

const productFilterSlice = createSlice({
  name: 'product-filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortValue: (state, action: PayloadAction<string>) => {
      state.sortValue = action.payload;
    },
    setPriceRangeValue: (state, action: PayloadAction<string>) => {
      state.priceRangeValue = action.payload;
    },
    setShopValue: (state, action: PayloadAction<string>) => {
      state.shopValue = action.payload;
    },
    setCategoryValue: (state, action: PayloadAction<string>) => {
      state.categoryValue = action.payload;
    },

    clearFilters: (state) => {
      state.searchQuery = '';
      state.sortValue = '';
      state.priceRangeValue = '';
      state.shopValue = '';
      state.categoryValue = '';
    },
  },
});

export const {
  setSearchQuery,
  setSortValue,
  clearFilters,
  setPriceRangeValue,
  setShopValue,
  setCategoryValue,
} = productFilterSlice.actions;

export default productFilterSlice.reducer;
