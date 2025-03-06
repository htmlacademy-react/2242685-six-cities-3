import { Offers } from '../../types/offer';
import Card from '../../components/card/card';
import { CITIES } from '../../const';


type FavoritesListProps = {
  offers: Offers;
}

function FavoritesList ({offers}: FavoritesListProps) {
  return (
    <ul className="favorites__list">
      {
        CITIES.map((city) => {
          {/* если в offers[] есть хотя бы одно offer для текущего города, рисуем */}
          {
            if (offers.find((offer) => offer.city.name === city)) {
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
                    {/* итерация по массиву offers.filter((offer) => offer.city === currentCity) */}
                    {
                      offers.filter((offer) => offer.city.name === city).map((offer) => (<Card key={offer.id} offer={offer} />))
                    }
                  </div>
                </li>
              );
            }
          }
        })
      }
    </ul>
  );
}

export default FavoritesList;
