import { useParams } from 'react-router-dom';
import { Point } from '../../types/types';
import { mapOffersToMapPoints, percentsRating } from '../../utils/utils';
import Reviews from './reviews';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import { useEffect, useState } from 'react';

import { nanoid } from '@reduxjs/toolkit';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { fetchOfferAction, fetchNearOffersAction } from '../../store/api-actions';
import { processErrorHandle } from '../../services/process-error-handle';

const OFFER_IMGS_COUNT = 6;
const MAP_HEIGHT = 579;
const MAP_WIDTH = 1258;
const NEAR_OFFERS_COUNT = 3;

type OfferProps = {
  isAuth: boolean;
}

function Offer({isAuth}: OfferProps) {
  const params = useParams();
  const currentOfferId = params.id;
  const dispatch = useAppDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadOffer = async () => {
      try {
        // Создаем промисы для параллельного выполнения
        const offerPromise = dispatch(fetchOfferAction(currentOfferId));
        const nearOffersPromise = dispatch(fetchNearOffersAction(currentOfferId));
        // Ждем выполнения обоих промисов
        await Promise.all([offerPromise, nearOffersPromise]);

        setIsLoaded(true);

      } catch (error) {
        // Обработка ошибок
        processErrorHandle(String(error));
      }
    };

    loadOffer();
  }, [dispatch, currentOfferId]);

  const currentFullOffer = useAppSelector((state) => state.offer);
  const nearOffers = useAppSelector((state) => state.nearOffers);
  const offers = useAppSelector((state) => state.offers);
  const currentOffer = offers.find((offer) => offer.id === currentOfferId);

  if (!isLoaded) {
    return <LoadingScreen/>;
  }

  if (!currentFullOffer || !currentOffer) {
    return null;
  }

  const validNearOffers = nearOffers ? nearOffers.slice(0, NEAR_OFFERS_COUNT) : [];
  const nearPoints: Point[] = mapOffersToMapPoints([
    ...validNearOffers,
    currentOffer
  ]);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentFullOffer.images.slice(0, OFFER_IMGS_COUNT).map((image) => (
              <div key={nanoid()} className="offer__image-wrapper">
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
              <button className={`offer__bookmark-button ${currentFullOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
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
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentFullOffer.goods.map((good) => (
                  <li key={nanoid()} className="offer__inside-item">
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

            <Reviews offerId={currentOffer.id} isAuth={isAuth} />

          </div>
        </div>
        <section className="offer__map map" >

          <Map city={currentOffer.city} points={nearPoints} selectedOfferId={currentOffer.id} mapHeight={MAP_HEIGHT} mapWidth={MAP_WIDTH}/>

        </section>

      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
          Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">

            {nearOffers !== null && (
              <OffersList offers={nearOffers.slice(0, NEAR_OFFERS_COUNT)} />
            )}

          </div>
        </section>
      </div>
    </main>
  );
}

export default Offer;
