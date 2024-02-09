const numberOfCategories = 7;

export const CategoriesSkeleton = () => (
  <ul className="flex flex-col gap-2">
    {[...Array(numberOfCategories)].map((_, i) => (
      <li key={i} className="h-6 skeleton animation-skeleton"></li>
    ))}
  </ul>
);
