import { Offer } from '../../types/types';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import { mapOfferToMapPoints } from '../../utils/utils';
import Cities from '../../components/cities/cities';
import { CITIES, SortOrder } from '../../const';
import { useAppSelector } from '../../hooks/state';
import { offers } from '../../mocks/offers';
import PlacesSorting from '../../components/places-sorting/places-sorting';

const MAP_HEIGHT = 1000;

function Main() {
  const cityName = useAppSelector((state) => state.cityName);
  // const cityOffers = useAppSelector((state) => state.offers);
  // const dispatch = useAppDispatch();

  const defaultSortCityOffers = offers.filter((offer) => offer.city.name === cityName);
  let cityOffers = offers.filter((offer) => offer.city.name === cityName);
  const selectedCity = cityOffers[0].city;
  const points = mapOfferToMapPoints(cityOffers);
  // console.log(selectedCity);

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const handleCardHover = (offerId: string) => {
    const currentOffer = cityOffers.find((offer) => offer.id === offerId);

    setSelectedOffer(currentOffer);
  };

  const handleSortSelect = (sortOrder: SortOrder) => {
    switch (sortOrder) {
      case SortOrder.Popular:
        cityOffers = defaultSortCityOffers.slice();
        break;
      case SortOrder.PriceHighToLow:
        cityOffers.sort((a, b) => a.price - b.price);
        break;
      case SortOrder.PriceLowToHigh:
        cityOffers.sort((a, b) => b.price - a.price);
        break;
      case SortOrder.TopRatedFirst:
        cityOffers.sort((a, b) => b.rating - a.rating);
        break;
    }
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <Cities cities={CITIES} />

      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{cityOffers.length} places to stay in {cityName}</b>

            <PlacesSorting
              onSortSelect={handleSortSelect}
            />

            <OffersList
              offers={cityOffers}
              onCardHover={handleCardHover}
            />

          </section>
          <div className="cities__right-section">
            <section className="cities__map map">

              <Map city={selectedCity} points={points} selectedOffer={selectedOffer} mapHeight={MAP_HEIGHT} />

            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
