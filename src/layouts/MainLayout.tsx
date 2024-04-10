import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { Filter } from '../components/Filter';
import { Advertisement } from '../components/Advertisement';

type Props = {
  children: JSX.Element;
};

export const MainLayout = ({ children }: Props) => {
  const { pathname } = useLocation();

  const isProductsPage = useMemo(() => {
    const productsName = pathname.split('/').pop();

    return pathname === `/categories/${productsName}`;
  }, [pathname]);

  return (
    <div className="max-w-screen-xl min-h-screen flex flex-col gap-2 mx-2 py-2 sm:mx-5 sm:py-5 sm:gap-5 2xl:m-auto overflow-hidden">
      <Header />

      <main className="flex grow gap-5">
        <aside className="hidden lg:flex flex-col gap-5 grow z-10 min-w-[200px]">
          <Sidebar />

          <AnimatePresence initial={false}>
            {isProductsPage && <Filter />}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {!isProductsPage && <Advertisement />}
          </AnimatePresence>
        </aside>

        {children}
      </main>

      <Footer />
    </div>
  );
};
