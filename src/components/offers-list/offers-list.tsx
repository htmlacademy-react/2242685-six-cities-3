import Card from '../../components/card/card';
import { Offers } from '../../types/types';
//import { useState } from 'react';

type OffersListProps = {
  offers: Offers;
  onMouseOver?: (offerId: string) => void;
  onMouseLeave?: () => void;
}

function OffersList ({offers, onMouseOver, onMouseLeave}: OffersListProps) {
  // const [, setActiveCardId] = useState('');
  return (
    <div
      className="cities__places-list places__list tabs__content"
    >
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onMouseOver={() => onMouseOver?.(offer.id)}
          onMouseLeave={() => onMouseLeave?.()}
        />
      )
      )}
    </div>
  );
}

export default OffersList;
