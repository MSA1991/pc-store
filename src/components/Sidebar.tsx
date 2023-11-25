import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className="section w-80 h-80 z-10">
      <h2>Sidebar</h2>
      <div className="flex flex-col space-y-2 mt-5">
        <Link to="/">Home</Link>
        <Link to="notfound">Not Found</Link>
      </div>
    </aside>
  );
};
