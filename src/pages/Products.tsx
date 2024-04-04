import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatedPage } from './AnimatedPage';
import { ProductsList } from '../components/ProductsList';
import { filterProducts } from '../utils/filterProducts';
import { useGetCategoriesQuery, useGetProductsQuery } from '../redux/storeApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  clearFilter,
  setMaxPriceInCategory,
  setMinPriceInCategory,
} from '../redux/filterSlice';

export const Products = () => {
  const { products } = useParams();
  const { data: productList, isLoading } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const filter = useAppSelector(({ filter }) => filter);
  const dispatch = useAppDispatch();

  const categoryProducts = useMemo(
    () => productList?.filter(({ categoryId }) => categoryId === products),
    [productList, products]
  );

  useEffect(() => {
    if (!categoryProducts) return;

    const pricesArr = categoryProducts.map(
      ({ price, discount }) => price - discount
    );
    const minPriceInCategory = Math.min(...pricesArr);
    const maxPriceInCategory = Math.max(...pricesArr);

    dispatch(clearFilter());
    dispatch(setMinPriceInCategory(minPriceInCategory));
    dispatch(setMaxPriceInCategory(maxPriceInCategory));
  }, [categoryProducts, dispatch]);

  const categoryName = useMemo(
    () => categories?.find(({ id }) => id === products)?.name,
    [products, categories]
  );

  const filteredProducts = useMemo(() => {
    if (!categoryProducts) return [];

    return filterProducts(categoryProducts, filter);
  }, [categoryProducts, filter]);

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5 items-center">
        {categoryName ? (
          <h2 className="page-title">{categoryName}</h2>
        ) : (
          <div className="mx-auto w-48 sm:w-60 h-7 sm:h-8 dark-item animation-skeleton"></div>
        )}

        <ProductsList products={filteredProducts} isLoading={isLoading} />
      </div>
    </AnimatedPage>
  );
};
