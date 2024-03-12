import { useState } from 'react';
import { AnimatedPage } from './AnimatedPage';
import { faq } from '../data/faq';
import { FAQAccordion } from '../components/UI/FAQAccordion';

export const FAQ = () => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const handleChangeOpenQuestion = (id: number) => {
    if (id === openQuestionId) {
      setOpenQuestionId(null);
    } else {
      setOpenQuestionId(id);
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5 items-center">
        <h2 className="page-title">Frequently Asked Questions</h2>

        <ul className="w-full max-w-screen-md flex flex-col gap-2">
          {faq.map((question) => {
            const questionId = question.id;
            const isOpenQuestion = questionId === openQuestionId;

            return (
              <li
                key={questionId}
                onClick={() => handleChangeOpenQuestion(questionId)}
              >
                <FAQAccordion faq={question} isOpen={isOpenQuestion} />
              </li>
            );
          })}
        </ul>
      </div>
    </AnimatedPage>
  );
};
