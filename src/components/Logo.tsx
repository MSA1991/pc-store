import { LuCpu } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link
      to="/"
      className="flex space-x-2 items-center shrink-0 [&_>_:first-child]:hover:text-cayn"
    >
      <LuCpu className="h-8 w-8 text-blue transition-colors" />

      <span className="hidden text-xl font-bold sm:block">PC Store</span>
    </Link>
  );
};
