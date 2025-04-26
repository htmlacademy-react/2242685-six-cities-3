import { Offer } from '../../types/types';
import MemorizedOffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { useCallback, useState } from 'react';
import { mapOffersToMapPoints } from '../../utils/utils';
import Cities from '../../components/cities/cities';
import { CardViewType, CITIES, SortOrder } from '../../const';
import { useAppSelector } from '../../hooks/state';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import { getOffers } from '../../store/app-data/selectors';
import { getCityName, getSortOrder } from '../../store/app-params/selectors';

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

  const handleCardHover = useCallback((offerId: string | undefined) => {
    setSelectedOfferId(offerId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSelectedOfferId(undefined);
  }, []);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cityOffers.length} places to stay in {cityName}</b>

        <PlacesSorting />

        <MemorizedOffersList
          offers={cityOffers}
          onCardHover={handleCardHover}
          onMouseLeave={handleMouseLeave}
          cardViewType={CardViewType.Main}
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
  const offers = useAppSelector(getOffers);
  const selectedSortOrder = useAppSelector(getSortOrder);
  const cityName = useAppSelector(getCityName);
  const defaultSortCityOffers = offers?.filter((offer) => offer.city.name === cityName);

  let cityOffers = offers?.filter((offer) => offer.city.name === cityName);

  switch (selectedSortOrder) {
    case SortOrder.Popular:
      cityOffers = defaultSortCityOffers?.slice();
      break;
    case SortOrder.PriceHighToLow:
      cityOffers?.sort((a, b) => b.price - a.price);
      break;
    case SortOrder.PriceLowToHigh:
      cityOffers?.sort((a, b) => a.price - b.price);
      break;
    case SortOrder.TopRatedFirst:
      cityOffers?.sort((a, b) => b.rating - a.rating);
      break;
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <Cities cities={CITIES} />

      <div className="cities">

        {cityOffers && cityOffers.length > 0 ? (
          <CitiesPlaces cityOffers={cityOffers} cityName={cityName} />
        ) : (
          <NoCitiesPlaces />
        )}

      </div>
    </main>
  );
}
