import { useDeferredValue, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Input } from './UI/Input';
import { BurgerButton } from './UI/BurgerButton';
import { SearchedProducts } from './SearchedProducts';
import { Menu } from './Menu';
import { Logo } from './Logo';
import { UserActionIcons } from './UserActionIcons';

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

      <div className="block lg:hidden">
        <BurgerButton isOpen={isOpenMenu} onToggle={toggleMenu} />
      </div>

      <Input
        value={query}
        setValue={setQuery}
        type="search"
        placeholder="Search..."
      />

      <div className="justify-self-end">
        <UserActionIcons />
      </div>

      <AnimatePresence>
        {deferredQuery.trim() && <SearchedProducts query={deferredQuery} />}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenMenu && <Menu toggleMenu={toggleMenu} />}
      </AnimatePresence>
    </header>
  );
};
