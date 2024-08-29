import { memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FaMinus } from 'react-icons/fa6';

type Props = {
  question: string;
  answer: string;
  isOpen: boolean;
};

export const Accordion = memo(({ question, answer, isOpen }: Props) => (
  <div className="dark-item p-5 cursor-pointer hover-text">
    <div className="flex justify-between items-center gap-10">
      <p className="font-bold text-base sm:text-lg">{question}</p>

      <div className="relative text-white">
        <FaMinus />

        <AnimatePresence initial={false}>
          {!isOpen && (
            <m.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              exit={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0"
            >
              <FaMinus />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>

    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pt-2 pr-10 text-light-gray text-sm sm:text-base">
            {answer}
          </p>
        </m.div>
      )}
    </AnimatePresence>
  </div>
));
