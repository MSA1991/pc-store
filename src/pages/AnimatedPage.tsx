import { motion as m } from 'framer-motion';

type Props = {
  children: JSX.Element;
};

export const AnimatedPage = ({ children }: Props) => {
  return (
    <m.section
      initial={{ opacity: 0, x: '50%' }}
      animate={{ opacity: 1, x: '0%' }}
      exit={{ opacity: 0, x: '-50%' }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </m.section>
  );
};
