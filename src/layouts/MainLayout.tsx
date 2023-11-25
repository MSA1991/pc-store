import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';

export const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="flex space-x-2 sm:space-x-5">
        <Sidebar />
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
