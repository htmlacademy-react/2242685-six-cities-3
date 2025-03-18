import { Offers } from '../../types/types';
import Card from '../../components/card/card';

type FavoritesListProps = {
  offers: Offers;
}

type FavoritesPlacesProps = {
  offers: Offers;
  city: string;
}

function FavoritesPlaces ({offers, city}: FavoritesPlacesProps) {
  return (
    offers.filter((offer) => offer.city.name === city).map((offer) => (<Card key={offer.id} offer={offer} />))
  );
}

function FavoritesLocationsItems ({offers, city}: FavoritesPlacesProps) {
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
        <FavoritesPlaces offers={offers} city={city} />
      </div>
    </li>
  );
}

function FavoritesList ({offers}: FavoritesListProps) {
  const uniqueCityNames = offers.map((offer) => offer.city.name)
    .filter((name, index, self) => self.indexOf(name) === index);

  return (
    <ul className="favorites__list">
      {uniqueCityNames.map((city) => <FavoritesLocationsItems key={city} offers={offers} city={city} />)}
    </ul>
  );
}

export default FavoritesList;
