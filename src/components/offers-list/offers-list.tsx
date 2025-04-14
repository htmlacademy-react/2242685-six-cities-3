import { memo } from 'react';
import MemorizedCard from '../../components/card/card';
import { Offers } from '../../types/types';

type OffersListProps = {
  offers: Offers;
  onCardHover?: (offerId: string | undefined) => void;
}

function OffersList ({offers, onCardHover}: OffersListProps) {

  return (
    <div
      className="cities__places-list places__list tabs__content"
    >
      {offers.map((offer) => (
        <MemorizedCard
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
        />
      )
      )}
    </div>
  );
}

const MemorizedOffersList = memo(OffersList);

export default MemorizedOffersList;
