import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { NotFound } from './pages/NotFound';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';

function App() {
  const location = useLocation();

  return (
    <div className="max-w-screen-xl space-y-2 mx-2 pt-2 pb-2 sm:mx-5 sm:pt-5 sm:space-y-5 sm:pb-5 2xl:m-auto">
      <AnimatePresence mode="wait" initial={false}>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
