import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { NotFound } from './pages/NotFound';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { FAQ } from './pages/FAQ';
import { Product } from './pages/Product';
import { BigSale } from './pages/BigSale';
import { LogIn } from './pages/LogIn';
import { SignUp } from './pages/SignUp';

function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="categories">
            <Route path=":products" element={<Products />} />
            <Route path=":products/:product" element={<Product />} />
          </Route>
          <Route path="big-sale" element={<BigSale />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
