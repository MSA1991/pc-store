import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../types/Category';
import { Products } from '../types/Products';

const BASE_URL = 'https://pc-store-api.onrender.com';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
    }),
    getProducts: builder.query<Products[], void>({
      query: () => 'products',
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsQuery } = storeApi;
