import { useDeferredValue, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { Logo } from './Logo';
import { SearchInput } from './UI/SearchInput';
import { NotificationIcon } from './UI/NotificationIcon';
import { SearchedProducts } from './SearchedProducts';
import { BurgerButton } from './UI/BurgerButton';
import { SidebarMenu } from './SidebarMenu';

export const Header = () => {
  const [query, setQuery] = useState('');
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const deferredQuery = useDeferredValue(query);

  const toggleMenu = () => {
    if (!isOpenMenu) {
      setIsOpenMenu(true);
      document.body.classList.add('overflow-hidden');

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      setIsOpenMenu(false);
      document.body.classList.remove('overflow-hidden');
    }
  };

  return (
    <header className="relative section grid grid-cols-[1fr_minmax(auto,_28rem)_1fr] items-center gap-2 sm:gap-5">
      <div className="hidden lg:block">
        <Logo />
      </div>

      <div className="h-full lg:hidden">
        <BurgerButton isOpen={isOpenMenu} onToggle={toggleMenu} />
      </div>

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

      <AnimatePresence>
        {isOpenMenu && <SidebarMenu toggleMenu={toggleMenu} />}
      </AnimatePresence>
    </header>
  );
};
