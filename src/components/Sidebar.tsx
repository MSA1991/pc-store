import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Filter } from './Filter';
import { Categories } from './Categories';
import { Advertisement } from './Advertisement';

type Props = {
  onMobile?: boolean;
};

export const Sidebar = ({ onMobile }: Props) => {
  const { pathname } = useLocation();

  const isProductsPage = useMemo(() => {
    const productsName = pathname.split('/').pop();

    return pathname === `/categories/${productsName}`;
  }, [pathname]);

  return (
    <aside className="flex flex-col gap-5">
      <Categories />

      <AnimatePresence initial={false}>
        {isProductsPage && <Filter />}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {!isProductsPage && !onMobile && <Advertisement />}
      </AnimatePresence>
    </aside>
  );
};
