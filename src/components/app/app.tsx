import { Page } from '../../const.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Page404 from '../../pages/page404/page404';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { Offers } from '../../types/offer.ts';

type AppProps = {
  placesCount: number;
  offers: Offers;
}

function App({placesCount, offers}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main placesCount={placesCount} offers={offers} />} />
          <Route path={Page.LOGIN} element={<Login />} />
          <Route path={Page.FAVORITES} element={
            <PrivateRoute>
              <Favorites offers={offers.filter((offer) => offer.isFavorite)}/>
            </PrivateRoute>
          }
          />
          <Route path={`${Page.OFFER}/:id`} element={<Offer />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
