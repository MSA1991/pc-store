import { PriceSkeleton } from './PriceSkeleton';

export const ProductCardSkeleton = () => (
  <div className="ring-2 ring-black rounded-md">
    <div className="bg-black aspect-square animation-skeleton"></div>

    <div className="flex flex-col h-28 justify-between mt-2 p-2">
      <div className="h-6 dark-item animation-skeleton"></div>
      <PriceSkeleton />
    </div>
  </div>
);
