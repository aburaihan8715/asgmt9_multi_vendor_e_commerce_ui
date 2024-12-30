import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFilterState {
  searchQuery: string;
  sortValue: string;
}

const initialState: IFilterState = {
  searchQuery: '',
  sortValue: '',
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

    clearFilters: (state) => {
      state.searchQuery = '';
      state.sortValue = '';
    },
  },
});

export const { setSearchQuery, setSortValue, clearFilters } =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
