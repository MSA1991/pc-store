import { ButtonSkeleton } from './ButtonSkeleton';

const NUMBER_OF_IMG = 3;
const NUMBER_OF_SPEC = 5;

export const ProductSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-5">
    <div className="flex flex-col gap-2 sm:gap-5 w-full md:w-2/5">
      <div className="aspect-square dark-item animation-skeleton"></div>

      <ul className="grid grid-cols-3 gap-2 sm:gap-5">
        {[...Array(NUMBER_OF_IMG)].map((_, i) => (
          <li
            key={i}
            className="aspect-square dark-item animation-skeleton"
          ></li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col gap-2 w-full md:w-3/5">
      <div className="h-7 w-72 dark-item animation-skeleton"></div>

      <div className="h-7 w-20 dark-item animation-skeleton"></div>

      <div className="h-6 w-56 dark-item animation-skeleton"></div>

      <div className="my-2 md:my-5">
        <div className="h-6 lg:h-7 w-32 dark-item animation-skeleton"></div>

        <div className="flex mt-2 justify-between">
          <ul className="flex flex-col gap-2 w-full">
            {[...Array(NUMBER_OF_SPEC)].map((_, i) => (
              <li
                key={i}
                className="h-5 lg:h-6 w-full dark-item animation-skeleton"
              ></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-5 mb-12">
        <ButtonSkeleton wFull />
        <ButtonSkeleton wFull />
      </div>
    </div>
  </div>
);
