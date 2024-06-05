import { useMemo } from 'react';
import { ProductsList } from '../components/ProductsList';
import { useGetProductsQuery } from '../store/storeApi';
import { AnimatedPage } from './AnimatedPage';

export const BigSalePage = () => {
  const { data, isLoading } = useGetProductsQuery();

  const discountedProducts = useMemo(() => {
    if (!data) return [];

    return data.filter(({ discount }) => discount > 0);
  }, [data]);

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5 items-center">
        <h2 className="page-title">Big Sale</h2>

        <ProductsList products={discountedProducts} isLoading={isLoading} />
      </div>
    </AnimatedPage>
  );
};
