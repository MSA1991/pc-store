const numberOfCategories = 7;

export const CategoriesSkeleton = () => {
  const categories = new Array(numberOfCategories).fill(0);

  return (
    <ul className="flex flex-col gap-2">
      {categories.map((_, i) => (
        <li key={i} className="bg-black h-6 rounded-md animation-skeleton"></li>
      ))}
    </ul>
  );
};
