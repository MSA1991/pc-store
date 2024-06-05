import { useMemo } from 'react';
import { Banner } from '../components/Banner';
import { CategorySlider } from '../components/CategorySlider';
import { RelatedProducts } from '../components/RelatedProducts';
import { useGetProductsQuery } from '../store/storeApi';
import { AnimatedPage } from './AnimatedPage';

export const HomePage = () => {
  const { data, isLoading } = useGetProductsQuery();

  const popularProducts = useMemo(() => (data ? data : []), [data]);
  const newProducts = useMemo(() => (data ? [...data].reverse() : []), [data]);

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5">
        <CategorySlider />

        <RelatedProducts
          text="Most popular products"
          products={popularProducts}
          isLoading={isLoading}
        />

        <Banner />

        <RelatedProducts
          text="New products"
          products={newProducts}
          isLoading={isLoading}
        />
      </div>
    </AnimatedPage>
  );
};
