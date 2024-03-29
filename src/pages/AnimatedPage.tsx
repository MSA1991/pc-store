import { motion as m } from 'framer-motion';

type Props = {
  children: JSX.Element;
};

export const AnimatedPage = ({ children }: Props) => {
  return (
    <m.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="section w-full lg:w-4/5 h-full"
    >
      {children}
    </m.section>
  );
};
