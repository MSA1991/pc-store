import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';

export const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="flex grow gap-2 sm:gap-5">
        <Sidebar />
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
