import { Page } from '../../const.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Page404 from '../../pages/page404/page404';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import LoginLayout from '../layout/login-layout';
import MainLayout from '../layout/main-layout.tsx';

type AppProps = {
  isAuth: boolean;
}

function App({isAuth}: AppProps) {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path={Page.Favorites} element={
            <PrivateRoute isAuth={isAuth}>
              <Favorites />
            </PrivateRoute>
          }
          />
          <Route path={`${Page.Offer}/:id`} element={<Offer isAuth={isAuth} />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="/" element={<LoginLayout />}>
          <Route path={Page.Login} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
