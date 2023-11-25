import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { REVIEW } from './Mocks/Reviews.ts';
import { PLAYER } from './Mocks/Player.ts';
import { Provider } from 'react-redux';
import { store } from './Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        name={'The Grand Budapest Hotel'}
        genre={'Drama'}
        releaseDate={2014}
        review={REVIEW}
        player={PLAYER}
      />
    </Provider>
  </React.StrictMode>,
);
