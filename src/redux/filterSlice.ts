import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductsFilter } from '../types/ProductsFilter';

const initialState: ProductsFilter = {
  minPrice: 0,
  maxPrice: 0,
  minPriceInCategory: 0,
  maxPriceInCategory: 0,
  onlySale: false,
  sortingByPrice: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (_, { payload }: PayloadAction<ProductsFilter>) => {
      return payload;
    },
    setMinPriceInCategory: (state, { payload }: PayloadAction<number>) => {
      state.minPriceInCategory = payload;
    },
    setMaxPriceInCategory: (state, { payload }: PayloadAction<number>) => {
      state.maxPriceInCategory = payload;
    },
    clearFilter: () => {
      return initialState;
    },
  },
});

export const {
  setFilters,
  setMinPriceInCategory,
  setMaxPriceInCategory,
  clearFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
