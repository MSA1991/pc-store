import { LuCpu } from 'react-icons/lu';

export const Logo = () => {
  return (
    <div className="flex space-x-2 items-center shrink-0">
      <LuCpu className="h-8 w-8 hover-item" />

      <span className="hidden text-xl font-bold sm:block">PC Store</span>
    </div>
  );
};
