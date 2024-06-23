import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Button } from './UI/Button';
import { FavoriteIcon } from './Icon/FavoriteIcon';
import { CartIcon } from './Icon/CartIcon';
import { Products } from '../types/Products';
import {
  toggleProductInCart,
  toggleProductInFavorites,
} from '../store/userSlice';

type Props = {
  product: Products;
};

export const UserActionButtons = ({ product }: Props) => {
  const user = useAppSelector(({ user }) => user.currentUser);
  const favorites = useAppSelector(({ user }) => user.favorites);
  const cart = useAppSelector(({ user }) => user.cart);

  const isFavorite = favorites.some(({ id }) => id === product.id);
  const isInCart = cart.some(({ id }) => id === product.id);

  const dispatch = useAppDispatch();

  const handleToggleProductInFavorites = () => {
    if (!user) {
      toast('Log in to your account');
      return;
    }

    dispatch(toggleProductInFavorites(product));
  };

  const handleToggleProductInCart = () => {
    if (!user) {
      toast('Log in to your account');
      return;
    }

    dispatch(toggleProductInCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="flex flex-row gap-5">
      <Button onClick={handleToggleProductInCart} wFull>
        <CartIcon isInCart={isInCart} />
      </Button>

      <Button onClick={handleToggleProductInFavorites} wFull>
        <FavoriteIcon isFavorite={isFavorite} />
      </Button>
    </div>
  );
};
