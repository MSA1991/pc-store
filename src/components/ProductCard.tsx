import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Products } from '../types/Products';
import { Price } from './Price';

import 'react-lazy-load-image-component/src/effects/blur.css';
import { FavoriteIcon } from './Icon/FavoriteIcon';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleProductInFavorites } from '../store/userSlice';

type Props = {
  product: Products;
};

export const ProductCard = ({ product }: Props) => {
  const { image, title, price, discount, categoryId, id } = product;

  const user = useAppSelector(({ user }) => user.currentUser);
  const favorites = useAppSelector(({ user }) => user.favorites);
  const isFavorite = favorites.some(({ id }) => id === product.id);

  const dispatch = useAppDispatch();

  const handleToggleProductInFavorites = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!user) return;

    dispatch(toggleProductInFavorites(product));
  };

  return (
    <Link
      to={`/categories/${categoryId}/${id}`}
      className="overflow-hidden block dark-item hover-border relative"
    >
      <LazyLoadImage
        className="square-img"
        src={image}
        alt={title}
        width="100%"
        height="100%"
        effect="blur"
      />

      <div className="flex flex-col h-28 justify-between mt-2 p-2 font-bold">
        <h2 className="text-sm lg:text-base">{title}</h2>

        <Price price={price} discount={discount} />
      </div>

      <button
        className="absolute top-1 right-1 w-8 h-8 grid place-items-center bg-black/80 backdrop-blur-sm rounded"
        onClick={handleToggleProductInFavorites}
      >
        <FavoriteIcon isFavorite={isFavorite} blueColor />
      </button>
    </Link>
  );
};
