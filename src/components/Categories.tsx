import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { useGetCategoriesQuery } from '../store/storeApi';
import { CategoriesSkeleton } from './Skeletons/CategoriesSkeleton';
import { FAQLink } from './FAQLink';

export const Categories = () => {
  const { data, isLoading } = useGetCategoriesQuery();

  return (
    <div className="section-fixed-padding flex flex-col justify-between h-96">
      <h3 className="section-title">Categories</h3>

      {isLoading && <CategoriesSkeleton />}

      {data && data.length > 0 && (
        <nav>
          <ul className="flex flex-col gap-2">
            {data.map(({ id, name }) => (
              <li key={id}>
                <NavLink
                  to={`categories/${id}`}
                  className={({ isActive }) =>
                    clsx('hover-text', {
                      'text-blue': isActive,
                    })
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {(!data || data.length === 0) && !isLoading && (
        <div className="text-center section-title text-black uppercase">
          List is empty
        </div>
      )}

      <FAQLink />
    </div>
  );
};
