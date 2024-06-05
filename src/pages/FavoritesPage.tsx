import { ProductsList } from '../components/ProductsList';
import { useAppSelector } from '../store/hooks';
import { AnimatedPage } from './AnimatedPage';

export const FavoritesPage = () => {
  const products = useAppSelector(({ user }) => user.favorites);

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5 items-center">
        <h2 className="page-title">Your Favourite Products</h2>

        <ProductsList products={products} />
      </div>
    </AnimatedPage>
  );
};
