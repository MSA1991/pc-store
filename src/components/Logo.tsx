import { LuCpu } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link
      to="/"
      className="w-max flex gap-2 items-center [&_>_:first-child]:hover:text-cayn"
    >
      <LuCpu className="big-icon" />

      <span className="hidden text-xl font-bold sm:block">PC Store</span>
    </Link>
  );
};
