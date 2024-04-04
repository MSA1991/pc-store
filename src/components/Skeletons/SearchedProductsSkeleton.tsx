import { PriceSkeleton } from './PriceSkeleton';

export const SearchedProductsSkeleton = () => (
  <div className="flex gap-2 sm:gap-5 rounded-md overflow-hidden ring-2 ring-black">
    <div className="w-28 h-28 bg-black animation-skeleton"></div>

    <div className="flex flex-col gap-2 mt-2">
      <div className="w-48 h-6 dark-item animation-skeleton"></div>

      <PriceSkeleton />
    </div>
  </div>
);
