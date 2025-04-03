import { Offer, Point } from '../types/types';

export function percentsRating(rating: number) {
  return Math.round(rating) * 20;
}

export function mapOffersToMapPoints(offers: Offer[], offersCount?: number) {
  if (offersCount === undefined) {
    offersCount = offers.length;
  }
  const points: Point[] = offers.slice(0, offersCount).map((offer) => ({
    id: offer.id,
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    zoom: offer.location.zoom,
  }));
  return points;
}
