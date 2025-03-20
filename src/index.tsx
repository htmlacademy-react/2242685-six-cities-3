import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
// import { offers } from './mocks/offers';
import { AuthStatus } from './const';
import { store } from './store';

const currentAuthStatus = AuthStatus.Auth;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//<App offers={offers} isAuth={(currentAuthStatus as AuthStatus) === AuthStatus.Auth}/>
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App isAuth={(currentAuthStatus as AuthStatus) === AuthStatus.Auth} />
    </Provider>
  </React.StrictMode>
);
