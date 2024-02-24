import { PiNavigationArrowFill } from 'react-icons/pi';
import { SliderDirection } from '../../types/SliderDirection';

type Props = {
  direction: SliderDirection;
  handleSlideChange: (direction: SliderDirection) => void;
};

export const SliderButton = ({ direction, handleSlideChange }: Props) => {
  return (
    <button
      onClick={() => handleSlideChange(direction)}
      className="grid place-items-center shrink-0 w-10 h-10 bg-white rounded-full hover:bg-cayn transition-colors"
    >
      <PiNavigationArrowFill
        className={`text-black text-xl ${
          direction === SliderDirection.Next ? 'rotate-[135deg]' : '-rotate-45'
        }`}
      />
    </button>
  );
};
