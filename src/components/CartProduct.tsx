import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

import { Price } from './Price';
import { CartProducts } from '../types/Products';
import { useAppDispatch } from '../store/hooks';
import {
  decreaseQuantityProductInCart,
  increaseQuantityProductInCart,
  toggleProductInCart,
} from '../store/userSlice';

import 'react-lazy-load-image-component/src/effects/blur.css';

type Props = {
  product: CartProducts;
};

export const CartProduct = memo(({ product }: Props) => {
  const { title, image, price, discount, quantity, id } = product;
  const totalPrice = (price - discount) * quantity;

  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) return;

    dispatch(decreaseQuantityProductInCart(id));
  };

  const handleIncreaseQuantity = () => {
    if (quantity >= 10) return;

    dispatch(increaseQuantityProductInCart(id));
  };

  const handleToggleProductInCart = () => {
    dispatch(toggleProductInCart(product));
  };

  return (
    <article className="flex dark-item h-24 sm:h-32 md:h-44 overflow-hidden">
      <div className="w-6 sm:w-8 md:w-10 grid place-items-center">
        <button onClick={handleToggleProductInCart}>
          <MdDeleteOutline className="icon" />
        </button>
      </div>

      <div className="flex grow gap-2 md:gap-5">
        <div className="w-24 sm:w-32 md:w-44 shrink-0">
          <LazyLoadImage
            className="square-img"
            src={image}
            alt={title}
            width="100%"
            height="100%"
            effect="blur"
          />
        </div>

        <div className="grow">
          <h2 className="my-2 font-bold text-sm md:text-base lg:text-lg line-clamp-2">
            {title}
          </h2>

          <Price price={price} discount={discount} />
        </div>

        <div className="min-w-min w-1/4 sm:w-1/3 flex flex-col gap-2 sm:flex-row justify-around items-center self-center shrink-0">
          <div className="flex gap-1 sm:gap-2 items-center">
            <button onClick={handleDecreaseQuantity}>
              <CiSquareMinus className="big-icon" />
            </button>

            {quantity}

            <button onClick={handleIncreaseQuantity}>
              <CiSquarePlus className="big-icon" />
            </button>
          </div>

          <div className="text-lg font-bold">${totalPrice}</div>
        </div>
      </div>
    </article>
  );
});
