import { clsx } from 'clsx';
import { m } from 'framer-motion';

type Props = {
  children: JSX.Element;
  hFull?: boolean;
};

export const AnimatedPage = ({ children, hFull }: Props) => (
  <m.section
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3 }}
    className={clsx('section', {
      'h-fit': !hFull,
      'h-full': hFull,
    })}
  >
    {children}
  </m.section>
);
