import { AnimatedPage } from './AnimatedPage';

export const NotFound = () => {
  return (
    <AnimatedPage>
      <div className="py-40">
        <h2 className=" text-black font-bold text-[250px] leading-none text-center">
          404
        </h2>
        <p className="font-bold uppercase text-8xl text-center">Not found</p>
      </div>
    </AnimatedPage>
  );
};
