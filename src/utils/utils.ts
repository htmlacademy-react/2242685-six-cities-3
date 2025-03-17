import { Offer } from '../types/types';


function percentsRating(rating: number) {
  return Math.round(rating) * 20;
}

function mapOfferToMapPoints (offers: Offer[]) {
  const points = offers.map((offer) => ({
    id: offer.id,
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    zoom: offer.location.zoom,
  }));
  return points;
}

export {percentsRating, mapOfferToMapPoints};
