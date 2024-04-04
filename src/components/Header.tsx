import { useDeferredValue, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { SearchInput } from './UI/SearchInput';
import { NotificationIcon } from './UI/NotificationIcon';
import { SearchedProducts } from './SearchedProducts';

export const Header = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <header className="relative section grid grid-cols-[1fr_minmax(auto,_28rem)_1fr] items-center gap-2 sm:gap-5">
      <Logo />

      <SearchInput query={query} setQuery={setQuery} />

      <div className="flex items-center gap-2 sm:gap-5 justify-self-end">
        <NotificationIcon quantity={1}>
          <FaRegHeart className="icon" />
        </NotificationIcon>

        <NotificationIcon quantity={2}>
          <FiShoppingCart className="icon" />
        </NotificationIcon>

        <CgProfile className="big-icon" strokeWidth={0} />
      </div>

      <AnimatePresence>
        {deferredQuery.trim() && <SearchedProducts query={deferredQuery} />}
      </AnimatePresence>
    </header>
  );
};
