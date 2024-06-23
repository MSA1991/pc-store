import { Link } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr';
import { LuShoppingCart } from 'react-icons/lu';
import { CgProfile } from 'react-icons/cg';

import { NotificationIcon } from './UI/NotificationIcon';
import { useAppSelector } from '../store/hooks';

export const UserActionIcons = () => {
  const user = useAppSelector(({ user }) => user.currentUser);
  const favorites = useAppSelector(({ user }) => user.favorites);
  const cart = useAppSelector(({ user }) => user.cart);
  const userPhoto = user?.photo || '';

  return (
    <div className="flex items-center gap-2">
      <Link to="favorite" className="p-1">
        <NotificationIcon icon={GrFavorite} quantity={favorites.length} />
      </Link>

      <Link to="cart" className="p-1">
        <NotificationIcon icon={LuShoppingCart} quantity={cart.length} />
      </Link>

      <Link to={user ? '/signout' : '/login'}>
        {userPhoto ? (
          <img
            src={userPhoto}
            alt="user photo"
            loading="lazy"
            className="max-w-none w-8 square-img rounded-full ring-cayn transition-all hover:ring-2"
          />
        ) : (
          <CgProfile className="big-icon" />
        )}
      </Link>
    </div>
  );
};
