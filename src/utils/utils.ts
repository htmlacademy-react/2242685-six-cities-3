import { Offer, Point } from '../types/types';

function percentsRating(rating: number) {
  return Math.round(rating) * 20;
}

function mapOfferToMapPoints (offers: Offer[]) {
  const points: Point[] = offers.map((offer) => ({
    id: offer.id,
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    zoom: offer.location.zoom,
  }));
  return points;
}

export {percentsRating, mapOfferToMapPoints};
