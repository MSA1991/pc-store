import { Link } from 'react-router-dom';
import img from '../img/pc.svg';
import { Button } from './UI/Button';

export const Banner = () => {
  return (
    <article className="dark-item py-5 px-5 md:px-20">
      <div className="flex sm:justify-end sm:items-center h-96 relative">
        <img
          src={img}
          alt="pc"
          className="w-56 sm:w-72 lg:w-80 absolute right-0 bottom-0 sm:top-6 sm:left-0 lg:top-1"
        />

        <div className="flex flex-col gap-5 sm:items-end z-10 mt-5 sm:mt-0">
          <h2 className="big-title">Big Spring Sale</h2>

          <p className="uppercase font-bold text-sm md:text-base">
            save up to <span className="text-blue">30%</span> off
          </p>

          <Link to="big-sale">
            <Button>See More</Button>
          </Link>
        </div>
      </div>
    </article>
  );
};
