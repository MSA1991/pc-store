import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { Logo } from './Logo';
import { SearchInput } from './UI/SearchInput';

export const Header = () => {
  const [value, setValue] = useState('');

  return (
    <header className="section flex justify-between items-center space-x-2 sm:space-x-5 md:space-x-20">
      <Logo />

      <SearchInput value={value} setValue={setValue} />

      <div className="flex sm:space-x-5">
        <div className="hidden relative sm:block">
          <FaRegHeart className="icon" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-xs font-bold text-black grid place-items-center">
            2
          </span>
        </div>
        <div className="hidden relative sm:block">
          <FiShoppingCart className="icon" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-xs font-bold text-black grid place-items-center">
            2
          </span>
        </div>
        <div className="relative">
          <CgProfile className="icon" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-xs font-bold text-black grid place-items-center">
            2
          </span>
        </div>
      </div>
    </header>
  );
};
