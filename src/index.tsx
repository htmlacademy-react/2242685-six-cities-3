import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { AuthStatus } from './const';

const currentAuthStatus = AuthStatus.Auth;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} isAuth={(currentAuthStatus as AuthStatus) === AuthStatus.Auth}/>
  </React.StrictMode>
);
