import { useNavigate, useParams } from 'react-router-dom';
import { Point } from '../../types/types';
import { handleFavoriteButtonClick, mapOffersToMapPoints, percentsRating } from '../../utils/utils';
import MemorizedReviews from './reviews';
import Map from '../../components/map/map';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { fetchNearbyOffersAction, fetchFullOfferAction } from '../../store/api-actions';
import OffersList from '../../components/offers-list/offers-list';
import Page404 from '../page404/page404';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFullOffer, getNearOffers, getOffers } from '../../store/app-data/selectors';
import { Page } from '../../const';

const OFFER_IMGS_COUNT = 6;
const MAP_HEIGHT = 579;
const MAP_WIDTH = 1258;
const NEAR_OFFERS_COUNT = 3;

function Offer() {
  const params = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentOfferId = params.id;
  const currentFullOffer = useAppSelector(getFullOffer);
  const nearbyOffers = useAppSelector(getNearOffers);
  const offers = useAppSelector(getOffers);
  const currentOffer = offers?.find((offer) => offer.id === currentOfferId);

  useEffect(() => {
    if (currentOfferId) {
      dispatch(fetchFullOfferAction(currentOfferId));
      dispatch(fetchNearbyOffersAction(currentOfferId));
    }
  }, [dispatch, currentOfferId]);

  if (!currentFullOffer || !currentOffer) {
    return <Page404 />;
  }

  const validNearOffers = nearbyOffers ? nearbyOffers.slice(0, NEAR_OFFERS_COUNT) : [];
  const nearbyPoints: Point[] = mapOffersToMapPoints([
    ...validNearOffers,
    currentOffer
  ]);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentFullOffer.images.slice(0, OFFER_IMGS_COUNT).map((image) => (
              <div key={image} className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src={image}
                  alt="Photo studio"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              currentFullOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {currentFullOffer.title}
              </h1>
              <button
                className={`offer__bookmark-button ${currentFullOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                type="button"
                onClick={handleFavoriteButtonClick(currentFullOffer.id, Number(!currentFullOffer.isFavorite), authorizationStatus, navigate)}
              >
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${percentsRating(currentFullOffer.rating)}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentFullOffer.rating}</span>
            </div>
            <ul className="offer__features"> {/* отрисовать из данных */}
              <li className="offer__feature offer__feature--entire">{currentFullOffer.type}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {currentFullOffer.bedrooms} {
                  currentFullOffer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'
                }
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {currentFullOffer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentFullOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentFullOffer.goods.map((good) => (
                  <li key={good} className="offer__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src={currentFullOffer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{currentFullOffer.host.name}</span>
                <span className="offer__user-status">{currentFullOffer.host.isPro ? 'Pro' : null}</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {currentFullOffer.description}
                </p>
              </div>
            </div>

            <MemorizedReviews currentOfferId={currentOfferId} />

          </div>
        </div>
        <section className="offer__map map" >

          <Map city={currentOffer.city} points={nearbyPoints} selectedOfferId={currentOffer.id} mapHeight={MAP_HEIGHT} mapWidth={MAP_WIDTH}/>

        </section>

      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
          Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">

            {nearbyOffers !== null && (
              <OffersList
                offers={nearbyOffers.slice(0, NEAR_OFFERS_COUNT)}
                originalPage={Page.Offer}
              />
            )}

          </div>
        </section>
      </div>
    </main>
  );
}

export default Offer;
