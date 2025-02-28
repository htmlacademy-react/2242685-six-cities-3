import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Page404 from '../../pages/page404/page404';

type AppProps = {
  placesCount: number;
}

function App({placesCount}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main placesCount={placesCount} />} />
          <Route path="login" element={<Login />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="offer/:id" element={<Offer />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
