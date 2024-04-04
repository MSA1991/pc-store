import { ButtonSkeleton } from './ButtonSkeleton';

export const CategorySliderSkeleton = () => (
  <div className="relative ring-2 ring-black flex rounded-md gap-5 items-center p-5">
    <div className="hidden md:block shrink-0 w-10 h-10 rounded-full bg-black animation-skeleton"></div>

    <div className="w-full relative flex justify-between h-96 pt-5 md:pt-10">
      <div className="grow flex flex-col gap-5">
        <div className="dark-item animation-skeleton w-64 lg:w-[420px] h-10 lg:h-[60px]"></div>

        <div className="w-full md:w-96 h-28 md:h-20 lg:h-36 dark-item animation-skeleton"></div>

        <ButtonSkeleton />
      </div>

      <div className="hidden xl:block w-72 h-72 bg-black dark-item animation-skeleton"></div>

      <div className="w-full absolute bottom-0">
        <div className="w-28 h-2 mx-auto dark-item animation-skeleton"></div>
      </div>
    </div>

    <div className="hidden md:block shrink-0 w-10 h-10 rounded-full bg-black animation-skeleton"></div>
  </div>
);
