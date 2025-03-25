import { Offers } from '../../types/types';
import Card from '../../components/card/card';
import { useAppSelector } from '../../hooks/state';

type FavoritesPlacesProps = {
  favoriteOffers: Offers;
  city: string;
}

function FavoritesPlaces ({favoriteOffers, city}: FavoritesPlacesProps) {
  return (
    favoriteOffers.filter((offer) => offer.city.name === city).map((offer) => (<Card key={offer.id} offer={offer} />))
  );
}

function FavoritesLocationsItems ({favoriteOffers, city}: FavoritesPlacesProps) {
  return (
    <li className="favorites__locations-items" key={city}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <FavoritesPlaces favoriteOffers={favoriteOffers} city={city} />
      </div>
    </li>
  );
}

function FavoritesList () {
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const uniqueCityNames = favoriteOffers.map((offer) => offer.city.name)
    .filter((name, index, self) => self.indexOf(name) === index);

  return (
    <ul className="favorites__list">
      {uniqueCityNames.map((city) => <FavoritesLocationsItems key={city} favoriteOffers={favoriteOffers} city={city} />)}
    </ul>
  );
}

export default FavoritesList;
