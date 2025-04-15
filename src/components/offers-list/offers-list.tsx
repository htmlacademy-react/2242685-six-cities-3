import { memo } from 'react';
import MemorizedCard from '../../components/card/card';
import { Offers } from '../../types/types';
import { Page } from '../../const';

type OffersListProps = {
  offers: Offers;
  onCardHover?: (offerId: string | undefined) => void;
  originalPage: Page;
}

function OffersList ({offers, onCardHover, originalPage}: OffersListProps) {

  return (
    <div
      className="cities__places-list places__list tabs__content"
    >
      {offers.map((offer) => (
        <MemorizedCard
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
          originalPage={originalPage}
        />
      )
      )}
    </div>
  );
}

const MemorizedOffersList = memo(OffersList);

export default MemorizedOffersList;
