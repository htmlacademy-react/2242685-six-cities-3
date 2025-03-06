import Card from '../../components/card/card';
import { Offers } from '../../types/offer';
import { useState } from 'react';

type OffersListProps = {
  offers: Offers;
}

function OffersList ({offers}: OffersListProps) {
  const [, setActiveCardId] = useState('');
  return (
    <div
      className="cities__places-list places__list tabs__content"
    >
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onMouseOver={(offerId) => setActiveCardId(offerId)}
          onMouseLeave={() => setActiveCardId('')}
        />
      )
      )}
    </div>
  );
}

export default OffersList;
