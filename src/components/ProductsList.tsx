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
      {isLoading && (
        <ul className="grid-container">
          {[...Array(INITIAL_VISIBLE_PRODUCTS)].map((_, i) => (
            <li key={i}>
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence initial={false}>
        {products.length > 0 && (
          <ul className="grid-container">
            {products.slice(0, visibleProducts).map((product) => (
              <m.li
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard product={product} />
              </m.li>
            ))}
          </ul>
        )}

        {products.length === 0 && !isLoading && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center big-title text-black uppercase py-40"
          >
            list is empty
          </m.div>
        )}
      </AnimatePresence>

      {isLoading && <ButtonSkeleton />}

      {visibleProducts < products.length && (
        <Button onClick={handleIncreaseVisibleProducts}>See More</Button>
      )}
    </div>
  );
});
