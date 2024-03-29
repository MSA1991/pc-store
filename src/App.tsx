import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { NotFound } from './pages/NotFound';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { FAQ } from './pages/FAQ';
import { Product } from './pages/Product';

function App() {
  const location = useLocation();

  return (
    <div className="max-w-screen-xl min-h-screen flex flex-col gap-2 mx-2 py-2 sm:mx-5 sm:py-5 sm:gap-5 2xl:m-auto">
      <AnimatePresence mode="wait" initial={false}>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="categories/:products" element={<Products />} />
            <Route path="categories/:products/:product" element={<Product />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
