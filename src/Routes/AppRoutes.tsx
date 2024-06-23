import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductPage } from '../pages/ProductPage';
import { BigSalePage } from '../pages/BigSalePage';
import { FAQPage } from '../pages/FAQPage';
import { LogInPage } from '../pages/LogInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { SignOutPage } from '../pages/SignOutPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { CartPage } from '../pages/CartPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="categories">
          <Route path=":products" element={<ProductsPage />} />
          <Route path=":products/:product" element={<ProductPage />} />
        </Route>
        <Route path="big-sale" element={<BigSalePage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signout" element={<SignOutPage />} />
        <Route path="favorite" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};
