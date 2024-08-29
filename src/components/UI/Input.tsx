import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

import { InputIcon } from './InputIcon';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  type: 'text' | 'search' | 'email' | 'password';
  onBlur?: () => void;
};

export const Input = ({
  value,
  setValue,
  placeholder,
  type,
  onBlur,
}: Props) => {
  const { pathname } = useLocation();

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearValue = () => {
    setValue('');
  };

  useEffect(() => {
    if (value) {
      clearValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <label className="w-full max-w-md dark-item flex items-center gap-2 p-2 [&_>_:first-child]:focus-within:text-blue">
      <InputIcon type={type} />

      <input
        className="w-full text-sm outline-none bg-black placeholder:text-light-gray"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeQuery}
        onBlur={onBlur}
      />

      <AnimatePresence>
        {value && type === 'search' && (
          <m.div
            initial={{ opacity: 0, scale: 0.5, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <IoClose
              className="cursor-pointer hover:text-blue transition-colors"
              onClick={clearValue}
            />
          </m.div>
        )}
      </AnimatePresence>
    </label>
  );
};
