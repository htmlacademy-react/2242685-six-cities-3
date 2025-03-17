import { useParams } from 'react-router-dom';
import { Offers, Point } from '../../types/types';
import { getMapPoints, percentsRating } from '../../utils/utils';
import Reviews from './reviews';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';

const OFFER_IMGS_COUNT = 6;
const NEAR_PLACES_COUNT = 3;
const MAP_HEIGHT = 579;
const MAP_WIDTH = 1258;

type OfferProps = {
  offers: Offers;
  isAuth: boolean;
}

function Offer({offers, isAuth}: OfferProps) {
  const params = useParams();
  const currentOffer = offers.find((item) => item.id === params.id);
  if (!currentOffer) {
    return null;
  }

  const nearOffers = offers.filter((offer) => offer.city.name === currentOffer.city.name).slice(0, NEAR_PLACES_COUNT); // заменить на реальные данные
  const points: Point[] = getMapPoints(nearOffers);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {Array.from({ length: OFFER_IMGS_COUNT }).map((_, index) => (
              // в реальных данных использовать offer.previewImage в качестве ключа
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src={currentOffer.previewImage} // заменить на реальные данные
                  alt="Photo studio"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              currentOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {currentOffer.title}
              </h1>
              <button className={`offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${percentsRating(currentOffer.rating)}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="offer__features"> {/* отрисовать из данных */}
              <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
              <li className="offer__feature offer__feature--bedrooms">
              3 Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
              Max 4 adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list"> {/* отрисовать из данных */}
                <li className="offer__inside-item">Wi-Fi</li>
                <li className="offer__inside-item">Washing machine</li>
                <li className="offer__inside-item">Towels</li>
                <li className="offer__inside-item">Heating</li>
                <li className="offer__inside-item">Coffee machine</li>
                <li className="offer__inside-item">Baby seat</li>
                <li className="offer__inside-item">Kitchen</li>
                <li className="offer__inside-item">Dishwasher</li>
                <li className="offer__inside-item">Cabel TV</li>
                <li className="offer__inside-item">Fridge</li>
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src="img/avatar-angelina.jpg"
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">Angelina</span>
                <span className="offer__user-status">Pro</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                A quiet cozy and picturesque that hides behind a a river by the
                unique lightness of Amsterdam. The building is green and from
                18th century.
                </p>
                <p className="offer__text">
                An independent House, strategically located between Rembrand
                Square and National Opera, but where the bustle of the city
                comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>

            <Reviews offerId={currentOffer.id} isAuth={isAuth} />

          </div>
        </div>
        <section className="offer__map map" >

          <Map city={currentOffer.city} points={points} selectedOffer={currentOffer} mapHeight={MAP_HEIGHT} mapWidth={MAP_WIDTH}/>

        </section>

      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
          Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">

            <OffersList offers={nearOffers} />

          </div>
        </section>
      </div>
    </main>
  );
}

export default Offer;
