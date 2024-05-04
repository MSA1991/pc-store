import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';

type Props = {
  children: JSX.Element;
};

export const MainLayout = ({ children }: Props) => (
  <div className="max-w-screen-xl min-h-screen flex flex-col gap-2 mx-2 py-2 sm:mx-5 sm:py-5 sm:gap-5 2xl:m-auto">
    <Header />

    <div className="flex grow gap-5">
      <aside className="hidden lg:block grow z-10">
        <Sidebar />
      </aside>

      <main className="w-full lg:w-[calc(80%-20px)] xl:w-4/5 shrink-0">
        {children}
      </main>
    </div>

    <Footer />
  </div>
);
