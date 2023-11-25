import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { motion as m, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import useDebounce from '../../hooks/useDebounce';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInput = ({ value, setValue }: Props) => {
  const [query, setQuery] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    setValue(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClearQuery = () => {
    setQuery('');
    setValue('');
  };

  const handleToggleFocus = () => {
    setIsFocused((_isFocused) => !_isFocused);
  };

  return (
    <label className="w-full flex items-center space-x-2 bg-black p-2 rounded-md">
      <FaSearch
        className={clsx('w-4 h-4 shrink-0 transition-colors', {
          'text-gray': !isFocused,
          'text-blue': isFocused,
        })}
      />

      <input
        className="w-full text-sm outline-none bg-black"
        type="text"
        placeholder="Search..."
        onFocus={handleToggleFocus}
        onBlur={handleToggleFocus}
        value={query}
        onChange={handleChangeQuery}
      />

      <AnimatePresence>
        {query && (
          <m.div
            initial={{ opacity: 0, scale: 0.5, y: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '0%' }}
            exit={{ opacity: 0, scale: 0.5, y: '50%' }}
            transition={{ duration: 0.3 }}
          >
            <IoClose
              className="cursor-pointer hover:text-blue transition-colors"
              onClick={handleClearQuery}
            />
          </m.div>
        )}
      </AnimatePresence>
    </label>
  );
};
