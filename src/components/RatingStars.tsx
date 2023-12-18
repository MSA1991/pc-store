import { FaRegStar, FaStar } from 'react-icons/fa';

type Props = {
  rating: number;
};

const NumberOfStars = 5;

export const RatingStars = ({ rating }: Props) => {
  const fillWidth = Math.round((rating * 100) / NumberOfStars);

  return (
    <div className="relative">
      <div className="flex">
        {[...Array(NumberOfStars)].map((_, i) => (
          <FaRegStar key={i} className="text-blue w-5 h-5 shrink-0" />
        ))}
      </div>

      <div
        className="flex overflow-hidden absolute top-0 left-0"
        style={{ width: `${fillWidth}%` }}
      >
        {[...Array(NumberOfStars)].map((_, i) => (
          <FaStar key={i} className="text-blue w-5 h-5 shrink-0" />
        ))}
      </div>
    </div>
  );
};
