import { memo, useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { clsx } from 'clsx';
import { SortingOptions } from '../../types/ProductsFilter';

type Props = {
  options: SortingOptions[];
  placeholder: string;
  selected: SortingOptions | null;
  onChangeSelected: (option: SortingOptions) => void;
};

export const Select = memo(
  ({ options, placeholder, selected, onChangeSelected }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleIsOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="relative" onClick={toggleIsOpen}>
        <div className="dark-item flex justify-between items-center p-2 cursor-pointer">
          <div>
            {selected ? (
              selected
            ) : (
              <span className="text-light-gray">{placeholder}</span>
            )}
          </div>

          <IoIosArrowDown
            className={clsx('transition-transform', {
              'rotate-180': isOpen,
            })}
          />
        </div>

        <div className="absolute top-11 w-full left-0 dark-item overflow-hidden">
          <AnimatePresence>
            {isOpen && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="dark-section p-2">
                  {options.map((option, i) => (
                    <li
                      key={i}
                      className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray transition-colors"
                      onClick={() => onChangeSelected(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);
