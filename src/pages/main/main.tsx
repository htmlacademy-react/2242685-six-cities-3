import { Offer } from '../../types/types';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import { mapOffersToMapPoints } from '../../utils/utils';
import Cities from '../../components/cities/cities';
import { CITIES, SortOrder, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/state';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import { fetchFavoritesAction } from '../../store/api-actions';
import { store } from '../../store';

const MAP_HEIGHT = 1000;

const NoCitiesPlaces = () => (
  <div className="cities__places-container cities__places-container--empty container">
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
      </div>
    </section>
    <div className="cities__right-section"></div>
    {/* ??? не отображается!!! */}
  </div>
);

type citiesPlacesProps = {
  cityOffers: Offer[];
  cityName: string;
}

const CitiesPlaces = ({cityOffers, cityName}: citiesPlacesProps) => {
  const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>(
    undefined
  );
  const selectedCity = cityOffers[0].city;
  const points = mapOffersToMapPoints(cityOffers);

  const handleCardHover = (offerId: string) => {
    const currentOffer = cityOffers.find((offer) => offer.id === offerId);

    setSelectedOfferId(currentOffer?.id);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityOffers.length} places to stay in {cityName}</b>

        <PlacesSorting />

        <OffersList
          offers={cityOffers}
          onCardHover={handleCardHover}
        />

      </section>
      <div className="cities__right-section">
        <section className="cities__map map">

          <Map city={selectedCity} points={points} selectedOfferId={selectedOfferId} mapHeight={MAP_HEIGHT} />

        </section>
      </div>
    </div>
  );
};

export default function Main() {
  const offers = useAppSelector((state) => state.offers);
  const selectedSortOrder = useAppSelector((state) => state.sortOrder);
  const cityName = useAppSelector((state) => state.cityName);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const defaultSortCityOffers = offers.filter((offer) => offer.city.name === cityName);

  let cityOffers = offers.filter((offer) => offer.city.name === cityName);

  // перенести в Login
  if (authorizationStatus === AuthorizationStatus.Auth) {
    store.dispatch(fetchFavoritesAction());
  }

  switch (selectedSortOrder) {
    case SortOrder.Popular:
      cityOffers = defaultSortCityOffers.slice();
      break;
    case SortOrder.PriceHighToLow:
      cityOffers.sort((a, b) => b.price - a.price);
      break;
    case SortOrder.PriceLowToHigh:
      cityOffers.sort((a, b) => a.price - b.price);
      break;
    case SortOrder.TopRatedFirst:
      cityOffers.sort((a, b) => b.rating - a.rating);
      break;
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <Cities cities={CITIES} />

      <div className="cities">

        {cityOffers.length > 0 ? (
          <CitiesPlaces cityOffers={cityOffers} cityName={cityName} />
        ) : (
          <NoCitiesPlaces />
        )}

      </div>
    </main>
  );
}
