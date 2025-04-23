import { memo } from 'react';
import MemorizedCard from '../../components/card/card';
import { Offers } from '../../types/types';
import { CardViewType } from '../../const';

type OffersListProps = {
  offers: Offers;
  onCardHover?: (offerId: string | undefined) => void;
  cardViewType: CardViewType;
}

function OffersList ({offers, onCardHover, cardViewType}: OffersListProps) {

  return (
    <div
      className="cities__places-list places__list tabs__content"
    >
      {offers.map((offer) => (
        <MemorizedCard
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
          cardViewType={cardViewType}
        />
      )
      )}
    </div>
  );
}

const MemorizedOffersList = memo(OffersList);

export default MemorizedOffersList;
