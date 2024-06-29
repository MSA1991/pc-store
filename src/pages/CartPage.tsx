import { useMemo } from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';

import { CartProduct } from '../components/CartProduct';
import { Button } from '../components/UI/Button';
import { useAppSelector } from '../store/hooks';
import { AnimatedPage } from './AnimatedPage';

export const CartPage = () => {
  const cart = useAppSelector(({ user }) => user.cart);

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, product) => {
      const { price, discount, quantity } = product;
      const sum = (price - discount) * quantity;

      return acc + sum;
    }, 0);
  }, [cart]);

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5 items-center">
        <h2 className="page-title">Your Shopping Cart</h2>

        {cart.length > 0 && (
          <>
            <ul className="w-full">
              <AnimatePresence initial={false}>
                {cart.map((product) => (
                  <m.li
                    layout
                    key={product.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="pb-2 sm:pb-5">
                      <CartProduct product={product} />
                    </div>
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="w-full">
              <div className="h-1 bg-black rounded-full mb-5"></div>

              <div className="flex justify-between items-center">
                <p className="section-title">
                  Total: <span className="text-blue">${cartTotal}</span>
                </p>

                <a
                  href="https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-superJumbo.jpg"
                  target="_blank"
                >
                  <Button>Buy</Button>
                </a>
              </div>
            </div>
          </>
        )}

        <AnimatePresence initial={false}>
          {cart.length === 0 && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center big-title text-black uppercase py-40"
            >
              cart is empty
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedPage>
  );
};
