import { Offer, Offers } from '../../types/types';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import { mapOfferToMapPoints } from '../../utils/utils';
import Cities from '../../components/cities/cities';
import { CITIES } from '../../const';


const selectedCityName = 'Amsterdam';
const MAP_HEIGHT = 1000;

type MainProps = {
  offers: Offers;
}

function Main({offers}: MainProps) {
  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCityName);
  const selectedCity = selectedCityOffers[0].city;
  const points = mapOfferToMapPoints(selectedCityOffers);

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const handleCardHover = (offerId: string) => {
    const currentOffer = selectedCityOffers.find((offer) => offer.id === offerId);

    setSelectedOffer(currentOffer);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <Cities cities={CITIES} />

      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{selectedCityOffers.length} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>

            <OffersList
              offers={selectedCityOffers}
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
