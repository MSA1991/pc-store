import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatedPage } from './AnimatedPage';
import { useGetCategoriesQuery, useGetProductsQuery } from '../redux/storeApi';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/UI/Button';
import { ProductCardSkeleton } from '../components/Skeletons/ProductCardSkeleton';

const initialVisibleProducts = 8;

export const Products = () => {
  const [visibleProducts, setVisibleProducts] = useState(
    initialVisibleProducts
  );
  const { products } = useParams();
  const { data, isLoading } = useGetProductsQuery();
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

        <div className="w-full grid grid-cols-2 md:grid-cols-4 justify-center gap-2 sm:gap-5">
          {isLoading && arr.map((_, i) => <ProductCardSkeleton key={i} />)}

          {categoryProducts &&
            categoryProducts.slice(0, visibleProducts).map((product) => (
              <Link to={`${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
        </div>

        {categoryProducts && visibleProducts < categoryProducts.length && (
          <Button text="See More" onClick={handleIncreaseVisibleProducts} />
        )}
      </div>
    </AnimatedPage>
  );
};
