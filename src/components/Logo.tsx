import { LuCpu } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link
      to="/"
      className="w-max flex gap-1 items-center [&_>_:first-child]:hover:text-cayn md:gap-2"
    >
      <LuCpu className="w-7 h-7 text-blue transition-colors md:w-8 md:h-8" />

      <span className="section-title">PC Store</span>
    </Link>
  );
};
