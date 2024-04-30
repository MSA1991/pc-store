import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Logo } from './Logo';

type Props = {
  toggleMenu: () => void;
};

export const SidebarMenu = ({ toggleMenu }: Props) => {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      toggleMenu();
    } else {
      isFirstRender.current = false;
    }
  }, [pathname, toggleMenu]);

  return (
    <>
      <m.div
        initial={{ transform: 'translateX(-100%)' }}
        animate={{ transform: 'translateX(0)' }}
        exit={{ transform: 'translateX(-100%)' }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full max-w-[280px] bg-black z-30 p-5 pt-[88px] sm:pt-[116px] h-full min-h-screen overflow-y-auto ring-2 ring-light-gray"
      >
        <Sidebar onMobile />
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 z-20"
        onClick={toggleMenu}
      ></m.div>

      <m.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
        exit={{ x: -300 }}
        transition={{ duration: 0.3 }}
        className="absolute left-3 sm:left-0 lg:hidden z-30 flex items-center justify-end bg-black w-[240px] h-[52px] sm:h-[76px] before:absolute before:-top-5 before:left-0 before:w-full before:h-5 before:bg-black"
      >
        <div onClick={toggleMenu}>
          <Logo />
        </div>
      </m.div>
    </>
  );
};
