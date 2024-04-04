import { memo, useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Products } from '../types/Products';
import { ProductCardSkeleton } from './Skeletons/ProductCardSkeleton';
import { Button } from './UI/Button';
import { ProductCard } from './ProductCard';
import { ButtonSkeleton } from './Skeletons/ButtonSkeleton';

type Props = {
  products: Products[] | [];
  isLoading?: boolean;
};

const INITIAL_VISIBLE_PRODUCTS = 8;

export const ProductsList = memo(({ products, isLoading }: Props) => {
  const [visibleProducts, setVisibleProducts] = useState(
    INITIAL_VISIBLE_PRODUCTS
  );

  const handleIncreaseVisibleProducts = () => {
    setVisibleProducts(
      (_visibleProducts) => _visibleProducts + INITIAL_VISIBLE_PRODUCTS
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-5">
        {isLoading &&
          [...Array(INITIAL_VISIBLE_PRODUCTS)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}

        <AnimatePresence initial={false}>
          {products.length > 0 &&
            products.slice(0, visibleProducts).map((product) => (
              <m.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard product={product} />
              </m.div>
            ))}
        </AnimatePresence>
      </div>

      {products.length === 0 && !isLoading && (
        <div className="text-black uppercase text-9xl py-40 font-bold">
          Empty
        </div>
      )}

      {isLoading && <ButtonSkeleton />}

      {visibleProducts < products.length && (
        <Button text="See More" onClick={handleIncreaseVisibleProducts} />
      )}
    </div>
  );
});
