import { AnimatedPage } from './AnimatedPage';

export const NotFound = () => {
  return (
    <AnimatedPage hFull>
      <div className="h-full flex flex-col justify-center items-center">
        <div className="text-black font-bold text-9xl sm:text-[160px] uppercase leading-none">
          404
        </div>
        <p className="page-title uppercase">Page Not found</p>
      </div>
    </AnimatedPage>
  );
};
