import { Outlet, useLocation } from 'react-router-dom';
import Header from './header';
import { useAppSelector } from '../../hooks/state';
import { getFavorites } from '../../store/app-data/selectors';
import { Page } from '../../const';

function Layout () {
  const favorites = useAppSelector(getFavorites);
  const location = useLocation();
  let noFavoritesClassName = '';

  if (location.pathname.includes(String(Page.Favorites))) {
    noFavoritesClassName = favorites?.length === 0 ? 'page--favorites-empty' : '';
  }

  return (
    <div className={`page ${noFavoritesClassName}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
