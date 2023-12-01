export const ProductCardSkeleton = () => {
  return (
    <article className="w-56 ring-2 ring-black rounded-md animation-skeleton">
      <div className="bg-black w-full aspect-square"></div>

      <div className="flex flex-col h-24 justify-between mt-2 p-2">
        <div className="h-6 bg-black rounded-md"></div>
        <div className="h-7 bg-black rounded-md w-20"></div>
      </div>
    </article>
  );
};
