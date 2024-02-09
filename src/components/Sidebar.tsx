import { Link, NavLink } from 'react-router-dom';
import { useGetCategoriesQuery } from '../redux/storeApi';
import { CategoriesSkeleton } from './Skeletons/CategoriesSkeleton';

export const Sidebar = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  return (
    <aside className="section hidden lg:flex flex-col justify-between w-64 xl:w-80 h-96 z-10">
      <h2 className="font-bold text-xl">Categories</h2>

      <nav>
        {isLoading && !isError && <CategoriesSkeleton />}

        <ul className="flex flex-col gap-2">
          {data &&
            data.map(({ id, name }) => (
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
      </nav>

      <Link to="help" className="text-light-gray text-xs hover-text">
        HELP
      </Link>
    </aside>
  );
};
