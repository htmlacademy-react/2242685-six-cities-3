import Card from '../../components/card/card';
import { Offers } from '../../types/types';
//import { useState } from 'react';

type OffersListProps = {
  offers: Offers;
  onCardHover: (offerId: string) => void;
}

function OffersList ({offers, onCardHover}: OffersListProps) {
  // const [, setActiveCardId] = useState('');
  // const handleCardHover = (offerId: string) => {
  //   //event.preventDefault();
  //   onCardHover(offerId);
  // };

  return (
    <div
      className="cities__places-list places__list tabs__content"
    >
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
        />
      )
      )}
    </div>
  );
}

export default OffersList;
