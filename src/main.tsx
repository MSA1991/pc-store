import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './store/store.ts';
import App from './App.tsx';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <LazyMotion features={domAnimation}>
      <Router>
        <App />
        <ToastContainer
          stacked
          theme="dark"
          progressStyle={{ background: '#8085ff' }}
          toastClassName={() =>
            'dark-item border-2 border-light-gray p-2 flex justify-between font-bold'
          }
        />
      </Router>
    </LazyMotion>
  </Provider>
);
