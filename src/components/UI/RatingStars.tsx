import { useMemo, useState, useCallback } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

type Props = {
  rating: number;
};

const NUMBER_OF_STARS = 5;

export const RatingStars = ({ rating }: Props) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [visibleRating, setVisibleRating] = useState(rating);

  const starsWidth = useMemo(
    () => Math.round((visibleRating * 100) / NUMBER_OF_STARS),
    [visibleRating]
  );

  const handleChangeCurrentRating = useCallback((newRating: number) => {
    setCurrentRating(newRating);
  }, []);

  const handleChangeVisibleRating = useCallback((newRating: number) => {
    setVisibleRating(newRating);
  }, []);

  return (
    <div className="relative">
      <ul className="flex relative z-20">
        {[...Array(NUMBER_OF_STARS)].map((_, i) => (
          <li
            className="cursor-pointer"
            key={i}
            onMouseEnter={() => handleChangeVisibleRating(i + 1)}
            onMouseLeave={() => handleChangeVisibleRating(currentRating)}
            onClick={() => handleChangeCurrentRating(i + 1)}
          >
            <FaRegStar className="text-blue w-5 h-5 shrink-0" />
          </li>
        ))}
      </ul>

      <ul
        className="flex overflow-hidden absolute top-0 left-0"
        style={{ width: `${starsWidth}%` }}
      >
        {[...Array(NUMBER_OF_STARS)].map((_, i) => (
          <li key={i}>
            <FaStar className="text-blue w-5 h-5 shrink-0" />
          </li>
        ))}
      </ul>
    </div>
  );
};
