import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatedPage } from '../pages/AnimatedPage';
import { useGetCategoriesQuery, useGetProductsQuery } from '../redux/storeApi';
import { ProductCard } from './ProductCard';
import { Button } from './UI/Button';
import { ProductCardSkeleton } from './Skeletons/ProductCardSkeleton';
// import { ProductCardSkeleton } from './Skeletons/ProductCardSkeleton';

const initialVisibleProducts = 8;

export const Products = () => {
  const [visibleProducts, setVisibleProducts] = useState(
    initialVisibleProducts
  );
  const { products } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const categoryProducts = useMemo(
    () => data?.filter(({ categoryId }) => categoryId === products),
    [products, data]
  );

  const categoryName = useMemo(
    () => categories?.find(({ id }) => id === products)?.name,
    [products, categories]
  );

  const handleIncreaseVisibleProducts = () => {
    setVisibleProducts(
      (_visibleProducts) => _visibleProducts + initialVisibleProducts
    );
  };

  const arr = new Array(initialVisibleProducts).fill(0);

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5 items-center">
        {categoryName ? (
          <h2 className="text-2xl font-bold">{categoryName}</h2>
        ) : (
          <h2 className="mx-auto w-60 h-8 bg-black rounded-md animation-skeleton"></h2>
        )}

        <div className="w-full grid grid-cols-products justify-center gap-5">
          {isLoading && arr.map(() => <ProductCardSkeleton />)}

          {categoryProducts &&
            categoryProducts
              .slice(0, visibleProducts)
              .map((product, i) => <ProductCard key={i} product={product} />)}
        </div>

        {categoryProducts && visibleProducts < categoryProducts.length && (
          <div className="w-40" onClick={handleIncreaseVisibleProducts}>
            <Button text="See More" />
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};
