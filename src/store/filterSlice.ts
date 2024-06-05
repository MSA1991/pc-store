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
    setRangePriceInCategory: (
      state,
      { payload }: PayloadAction<{ min: number; max: number }>
    ) => {
      state.minPriceInCategory = payload.min;
      state.maxPriceInCategory = payload.max;
    },
    clearFilter: () => {
      return initialState;
    },
  },
});

export const { setFilters, setRangePriceInCategory, clearFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
