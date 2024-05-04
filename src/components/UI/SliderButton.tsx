import { PiNavigationArrowFill } from 'react-icons/pi';
import { clsx } from 'clsx';
import { SliderDirection } from '../../types/SliderDirection';

type Props = {
  direction: SliderDirection;
  handleSlideChange: (direction: SliderDirection) => void;
};

export const SliderButton = ({ direction, handleSlideChange }: Props) => {
  const isNext = direction === SliderDirection.Next;

  return (
    <button
      onClick={() => handleSlideChange(direction)}
      className="grid place-items-center w-10 h-10 bg-blue rounded-full hover:bg-cayn transition-colors"
    >
      <PiNavigationArrowFill
        className={clsx('text-black text-xl', {
          'rotate-[135deg]': isNext,
          '-rotate-45': !isNext,
        })}
      />
    </button>
  );
};
