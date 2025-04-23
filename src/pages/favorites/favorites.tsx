import { useAppSelector } from '../../hooks/state';
import { getFavorites } from '../../store/app-data/selectors';
import FavoritesEmpty from './favorites-empty';
import FavoritesList from './favorites-list';
import { Link } from 'react-router-dom';

function Favorites() {
  const favorites = useAppSelector(getFavorites);
  const mainNoFavoritesClassname = favorites?.length === 0 ? 'page__main--favorites-empty' : '';
  const sectionNoFavoritesClassname = favorites?.length === 0 ? 'favorites--empty' : '';

  return (
    <>
      <main className={`page__main page__main--favorites ${mainNoFavoritesClassname}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${sectionNoFavoritesClassname}`}>
            {favorites?.length === 0 ?
              <FavoritesEmpty /> :
              <FavoritesList />}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </>
  );
}

export default Favorites;
