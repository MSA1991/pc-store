const NUMBER_OF_CATEGORIES = 7;

export const CategoriesSkeleton = () => (
  <ul className="flex flex-col gap-2">
    {[...Array(NUMBER_OF_CATEGORIES)].map((_, i) => (
      <li key={i} className="h-6 dark-item animation-skeleton"></li>
    ))}
  </ul>
);
