import { motion as m, AnimatePresence } from 'framer-motion';
import { FaMinus } from 'react-icons/fa6';
import { FAQ } from '../../types/FAQ';

type Props = {
  faq: FAQ;
  isOpen: boolean;
};

export const FAQAccordion = ({ faq, isOpen }: Props) => {
  const { question, answer } = faq;

  return (
    <div className="skeleton p-5 cursor-pointer hover:text-cayn transition-colors">
      <div className="flex justify-between items-center gap-10">
        <p className="font-bold text-base sm:text-lg">{question}</p>

        <div className="relative">
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
  );
};
