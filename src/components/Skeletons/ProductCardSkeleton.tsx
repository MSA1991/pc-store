export const ProductCardSkeleton = () => {
  return (
    <div className="ring-2 ring-black rounded-md animation-skeleton">
      <div className="bg-black aspect-square"></div>

      <div className="flex flex-col h-28 justify-between mt-2 p-2">
        <div className="h-6 skeleton"></div>
        <div className="h-7 w-20 skeleton"></div>
      </div>
    </div>
  );
};
