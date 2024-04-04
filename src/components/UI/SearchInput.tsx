import { useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInput = ({ query, setQuery }: Props) => {
  const location = useLocation();

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    clearQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <label className="max-w-md dark-item flex items-center gap-2 p-2 [&_>_:first-child]:focus-within:text-blue">
      <FaSearch className="w-4 h-4 text-light-gray shrink-0 transition-colors" />

      <input
        className="w-full text-sm outline-none bg-black placeholder:text-light-gray"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChangeQuery}
      />

      <AnimatePresence>
        {query && (
          <m.div
            initial={{ opacity: 0, scale: 0.5, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <IoClose
              className="cursor-pointer hover:text-blue transition-colors"
              onClick={clearQuery}
            />
          </m.div>
        )}
      </AnimatePresence>
    </label>
  );
};
