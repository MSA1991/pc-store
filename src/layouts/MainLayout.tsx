import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';

type Props = {
  children: JSX.Element;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="max-w-screen-xl min-h-screen flex flex-col gap-2 mx-2 py-2 sm:mx-5 sm:py-5 sm:gap-5 2xl:m-auto overflow-hidden">
      <Header />

      <main className="flex grow gap-5">
        <aside className="hidden lg:block grow z-10 min-w-[200px]">
          <Sidebar />
        </aside>

        {children}
      </main>

      <Footer />
    </div>
  );
};
