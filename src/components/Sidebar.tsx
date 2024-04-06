import { Link, NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { useGetCategoriesQuery } from '../redux/storeApi';
import { CategoriesSkeleton } from './Skeletons/CategoriesSkeleton';

export const Sidebar = () => {
  const { data, isLoading } = useGetCategoriesQuery();

  return (
    <div className="section flex flex-col justify-between h-96">
      <h2 className="section-title">Categories</h2>

      <nav>
        {isLoading && <CategoriesSkeleton />}

        {data && (
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
        )}
      </nav>

      <Link to="faq" className="text-light-gray text-xs w-fit hover-text">
        FAQ
      </Link>
    </div>
  );
};
