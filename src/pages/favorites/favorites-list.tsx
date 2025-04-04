import { Offers } from '../../types/types';
import Card from '../../components/card/card';
import { useAppSelector } from '../../hooks/state';
import { Link } from 'react-router-dom';
import { Page } from '../../const';
import { handleCityClick } from '../../utils/utils';

type FavoritesPlacesProps = {
  favoriteOffers: Offers;
  cityName: string;
}

function FavoritesPlaces ({favoriteOffers, cityName}: FavoritesPlacesProps) {
  return (
    favoriteOffers.filter((offer) => offer.city.name === cityName).map((offer) => (<Card key={offer.id} offer={offer} />))
  );
}

function FavoritesLocationsItems ({favoriteOffers, cityName}: FavoritesPlacesProps) {
  return (
    <li className="favorites__locations-items" key={cityName}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={Page.Main}
            onClick={handleCityClick(cityName)}
          >
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <FavoritesPlaces favoriteOffers={favoriteOffers} cityName={cityName} />
      </div>
    </li>
  );
}

export default function FavoritesList () {
  const favoriteOffers = useAppSelector((state) => state.favorites);

  if (!favoriteOffers) {
    return null;
  }

  const uniqueCityNames = favoriteOffers.map((offer) => offer.city.name)
    .filter((name, index, self) => self.indexOf(name) === index);

  return (
    <ul className="favorites__list">
      {uniqueCityNames.map((cityName) => <FavoritesLocationsItems key={cityName} favoriteOffers={favoriteOffers} cityName={cityName} />)}
    </ul>
  );
}
