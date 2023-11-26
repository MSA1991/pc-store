import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../redux/storeApi';

export const Sidebar = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();
  console.log(data, isLoading, isError);

  return (
    <aside className="section w-80 h-80 z-10">
      <h2 className="font-bold text-xl">Categories</h2>

      {isLoading && !data && !isError && <div>Loading...</div>}

      <div className="flex flex-col space-y-2 mt-5">
        {data &&
          data.map((category) => <Link to={category.id}>{category.name}</Link>)}
      </div>
    </aside>
  );
};
