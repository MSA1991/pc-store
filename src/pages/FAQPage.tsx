import { useState } from 'react';

import { AnimatedPage } from './AnimatedPage';
import { faq } from '../data/faq';
import { Accordion } from '../components/UI/Accordion';

export const FAQPage = () => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const handleChangeOpenQuestion = (id: number) => {
    if (id === openQuestionId) {
      setOpenQuestionId(null);
    } else {
      setOpenQuestionId(id);
    }
  };

  return (
    <AnimatedPage hFull>
      <div className="flex flex-col gap-5 items-center">
        <h2 className="page-title">Frequently Asked Questions</h2>

        <ul className="w-full max-w-screen-md flex flex-col gap-2">
          {faq.map(({ question, answer, id }) => {
            const isOpenQuestion = id === openQuestionId;

            return (
              <li key={id} onClick={() => handleChangeOpenQuestion(id)}>
                <Accordion
                  question={question}
                  answer={answer}
                  isOpen={isOpenQuestion}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </AnimatedPage>
  );
};
