import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../types/Category';
import { Products } from '../types/Products';
import { Product } from '../types/Product';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
      keepUnusedDataFor: 120,
    }),
    getProducts: builder.query<Products[], void>({
      query: () => 'products',
      keepUnusedDataFor: 120,
    }),
    getProduct: builder.query<Product, { products: string; product: string }>({
      query: ({ products, product }) => `${products}/${product}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = storeApi;
