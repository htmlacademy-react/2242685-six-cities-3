import { useParams } from 'react-router-dom';
import { Point, FullOffer, Offer as OfferType } from '../../types/types';
import { mapOffersToMapPoints, percentsRating } from '../../utils/utils';
import Reviews from './reviews';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIRoute, BACKEND_URL } from '../../const';
import { nanoid } from '@reduxjs/toolkit';
import LoadingScreen from '../../components/loading-screen/loading-screen';

const OFFER_IMGS_COUNT = 6;
const MAP_HEIGHT = 579;
const MAP_WIDTH = 1258;

type OfferProps = {
  isAuth: boolean;
}

function Offer({isAuth}: OfferProps) {
  const params = useParams();
  const currentOfferId = params.id;

  // Состояние для хранения данных
  const [currentOffer, setCurrentOffer] = useState<FullOffer | null>(null);
  const [nearOffers, setNearOffers] = useState<OfferType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получаем данные в useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Получаем информацию о конкретном предложении
        const offerResponse = await axios.get<FullOffer>(`${BACKEND_URL}${APIRoute.Offers}/${currentOfferId}`);
        setCurrentOffer(offerResponse.data);

        // Получаем соседние предложения
        const nearbyResponse = await axios.get<OfferType[]>(`${BACKEND_URL}${APIRoute.Offers}/${currentOfferId}/nearby`);
        setNearOffers(nearbyResponse.data);

        setIsLoading(false);
      } catch (err: unknown) {
        setError((err as Error).message || 'Неизвестная ошибка');
        setIsLoading(false);
      }
    };

    if (currentOfferId) {
      fetchData();
    }
  }, [currentOfferId]);

  // Обрабатываем разные состояния
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!currentOffer) {
    return null;
  }

  const points: Point[] = mapOffersToMapPoints(nearOffers);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer.images.slice(0, OFFER_IMGS_COUNT).map((image) => (
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
                {currentOffer.bedrooms} {
                  currentOffer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'
                }
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {currentOffer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer.goods.map((good) => (
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
                    src={currentOffer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{currentOffer.host.name}</span>
                <span className="offer__user-status">{currentOffer.host.isPro ? 'Pro' : null}</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {currentOffer.description}
                </p>
              </div>
            </div>

            <Reviews offerId={currentOffer.id} isAuth={isAuth} />

          </div>
        </div>
        <section className="offer__map map" >

          <Map city={currentOffer.city} points={points} selectedOfferId={currentOffer.id} mapHeight={MAP_HEIGHT} mapWidth={MAP_WIDTH}/>

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
