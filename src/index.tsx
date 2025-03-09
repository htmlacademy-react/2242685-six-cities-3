import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { PLACES_COUNT } from './const';
import { offers } from './mocks/offers';
import { AuthStatus } from './const';

const currentAuthStatus = AuthStatus.NoAuth;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={PLACES_COUNT} offers={offers} isAuth={(currentAuthStatus as AuthStatus) === AuthStatus.Auth}/>
  </React.StrictMode>
);
