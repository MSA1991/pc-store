import { Link, NavLink } from 'react-router-dom';
import { useGetCategoriesQuery } from '../redux/storeApi';
import { CategoriesSkeleton } from './Skeletons/CategoriesSkeleton';

export const Sidebar = () => {
  const { data, isLoading } = useGetCategoriesQuery();

  return (
    <aside className="section hidden lg:flex flex-col justify-between grow h-96 z-10">
      <h2 className="font-bold text-xl">Categories</h2>

      <nav>
        {isLoading && <CategoriesSkeleton />}

        {data && (
          <ul className="flex flex-col gap-2">
            {data.map(({ id, name }) => (
              <li key={id} className="w-max">
                <NavLink
                  to={`categories/${id}`}
                  className={({ isActive }) =>
                    isActive ? 'text-blue' : 'hover-text'
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <Link to="faq" className="text-light-gray text-xs hover-text">
        FAQ
      </Link>
    </aside>
  );
};
