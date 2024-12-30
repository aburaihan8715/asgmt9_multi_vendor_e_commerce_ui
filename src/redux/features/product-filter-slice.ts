import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilterState {
  searchQuery: string;
  sortValue: string;
  priceRangeValue: string;
}

const initialState: IFilterState = {
  searchQuery: '',
  sortValue: '',
  priceRangeValue: '',
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

    clearFilters: (state) => {
      state.searchQuery = '';
      state.sortValue = '';
      state.priceRangeValue = '';
    },
  },
});

export const {
  setSearchQuery,
  setSortValue,
  clearFilters,
  setPriceRangeValue,
} = productFilterSlice.actions;

export default productFilterSlice.reducer;
