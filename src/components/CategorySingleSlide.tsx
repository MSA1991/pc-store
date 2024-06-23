import { Link } from 'react-router-dom';

import { Category } from '../types/Category';
import { Button } from './UI/Button';

type Props = {
  category: Category;
};

export const CategorySingleSlide = ({ category }: Props) => {
  const { name, description, id, image } = category;

  return (
    <div className="pt-5 md:pt-10 h-96">
      <div className="flex flex-col gap-5 relative z-10">
        <h2
          className="big-title"
          data-swiper-parallax-x="-500"
          data-swiper-parallax-duration="300"
        >
          {name}
        </h2>
        <p
          className="text-sm lg:text-base sm:w-96"
          data-swiper-parallax-x="-500"
          data-swiper-parallax-duration="600"
        >
          {description}
        </p>
        <Link
          className="w-min"
          to={`categories/${id}`}
          data-swiper-parallax-x="-500"
          data-swiper-parallax-duration="900"
        >
          <Button>See More</Button>
        </Link>
      </div>

      <img
        data-swiper-parallax-scale="0.2"
        src={image}
        alt={name}
        className="w-56 sm:w-72 lg:w-80 absolute bottom-5 md:top-10 lg:top-5 right-0 xl:right-5"
      />
    </div>
  );
};
