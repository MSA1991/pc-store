import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './store/store.ts';
import App from './App.tsx';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer
        stacked
        theme="dark"
        progressStyle={{ background: '#8085ff' }}
        toastClassName={() =>
          'bg-black border-2 border-light-gray p-2 rounded-md flex justify-between font-bold'
        }
      />
    </BrowserRouter>
  </Provider>
);
