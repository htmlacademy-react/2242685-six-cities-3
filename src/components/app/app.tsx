import { Page, AuthorizationStatus } from '../../const.ts';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Page404 from '../../pages/page404/page404';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import LoginLayout from '../layout/login-layout';
import MainLayout from '../layout/main-layout.tsx';
import { useAppSelector } from '../../hooks/state.tsx';
import LoadingScreen from '../loading-screen/loading-screen.tsx';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppProps = {
  isAuth: boolean;
}

function App({isAuth}: AppProps) {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={Page.Main} element={<MainLayout />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="" element={<Layout />}>
          <Route path={Page.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites />
            </PrivateRoute>
          }
          />
          <Route path={`${Page.Offer}/:id`} element={<Offer isAuth={isAuth} />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="" element={<LoginLayout />}>
          <Route path={Page.Login} element={<Login />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
