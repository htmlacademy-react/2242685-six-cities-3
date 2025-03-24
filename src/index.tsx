import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import { AuthStatus } from './const';
import { store } from './store';

const currentAuthStatus = AuthStatus.Auth;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App isAuth={(currentAuthStatus as AuthStatus) === AuthStatus.Auth} />
    </Provider>
  </React.StrictMode>
);
