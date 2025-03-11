import { Offers } from '../../types/offer';
import Card from '../../components/card/card';
import { CITIES } from '../../const';

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
  if (!offers.find((offer) => offer.city.name === city)) {
    return null;
  }
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
  return (
    <ul className="favorites__list">
      {CITIES.map((city) => <FavoritesLocationsItems key={city} offers={offers} city={city} />)}
    </ul>
  );
}

export default FavoritesList;
