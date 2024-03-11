import { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { FaMinus } from 'react-icons/fa6';
import { AnimatedPage } from './AnimatedPage';
import { questions } from '../data/questions';

export const FAQ = () => {
  const [activeQuestionID, setActiveQuestionID] = useState<number | null>(null);

  const handleChangeActiveQuestion = (id: number) => {
    if (id === activeQuestionID) {
      setActiveQuestionID(null);
    } else {
      setActiveQuestionID(id);
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5 items-center">
        <h2 className="page-title">Frequently Asked Questions</h2>

        <ul className="w-full max-w-screen-md flex flex-col gap-2">
          {questions.map(({ id, question, answer }) => {
            const isActiveQuestion = id === activeQuestionID;

            return (
              <li
                key={id}
                className="skeleton p-5 cursor-pointer"
                onClick={() => handleChangeActiveQuestion(id)}
              >
                <div className="flex justify-between items-center gap-10">
                  <p className="font-bold text-base sm:text-lg">{question}</p>

                  <div className="relative">
                    <FaMinus />

                    <AnimatePresence>
                      {isActiveQuestion && (
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
                  {isActiveQuestion && (
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
              </li>
            );
          })}
        </ul>
      </div>
    </AnimatedPage>
  );
};
