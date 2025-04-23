import { Offers } from '../../types/types';
import MemorizedCard from '../../components/card/card';
import { useAppSelector } from '../../hooks/state';
import { Link } from 'react-router-dom';
import { CardViewType, Page } from '../../const';
import { handleCityClick } from '../../utils/utils';
import { getFavorites } from '../../store/app-data/selectors';

type FavoritesPlacesProps = {
  favoriteOffers: Offers;
  cityName: string;
}

function FavoritesPlaces ({favoriteOffers, cityName}: FavoritesPlacesProps) {
  return (
    favoriteOffers.filter((offer) => offer.city.name === cityName).map((offer) =>
      (<MemorizedCard key={offer.id} offer={offer} cardViewType={CardViewType.Favorites} />))
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
  const favoriteOffers = useAppSelector(getFavorites);

  if (!favoriteOffers?.length) {
    return null;
  }

  const uniqueCityNames = [...new Set(favoriteOffers.map((offer) => offer.city.name))];


  return (
    <>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {uniqueCityNames.map((cityName) => <FavoritesLocationsItems key={cityName} favoriteOffers={favoriteOffers} cityName={cityName} />)}
      </ul>
    </>
  );
}
