import { FaSearch } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { Logo } from './Logo';

export const Header = () => {
  return (
    <header className="bg-gray rounded-md p-2 flex justify-between items-center space-x-2 sm:p-5 sm:space-x-5 md:space-x-20">
      <Logo />

      <label className="w-full flex items-center space-x-2 bg-black p-2 rounded-md">
        <FaSearch className="text-gray w-4 h-4 shrink-0" />

        <input
          className="w-full text-sm outline-none bg-black search-cancel:fill-white search-cancel:h-4 search-cancel:w-4 search-cancel:appearance-none search-cancel:bg-[url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg)] search-cancel:cursor-pointer"
          type="search"
          name="search"
          placeholder="Search..."
        />
      </label>

      <div className="flex sm:space-x-5">
        <div className="hidden relative sm:block">
          <FaRegHeart className="h-6 w-6 hover-item" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-xs font-bold text-black grid place-items-center">
            2
          </span>
        </div>
        <div className="hidden relative sm:block">
          <FiShoppingCart className="h-6 w-6 hover-item" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-xs font-bold text-black grid place-items-center">
            2
          </span>
        </div>
        <div className="relative">
          <CgProfile className="h-6 w-6 hover-item" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-xs font-bold text-black grid place-items-center">
            2
          </span>
        </div>
      </div>
    </header>
  );
};
