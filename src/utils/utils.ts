import { Offer } from '../types/types';

function groupBy<T extends Record<string, unknown>>(
  arr: readonly T[],
  keyProperty: (item: T) => string
): T[] {
  const grouped = arr.reduce((output: Record<string, T[]>, item: T) => {
    const key = keyProperty(item);
    if (!output[key]) {
      output[key] = [];
    }
    output[key].push(item);
    return output;
  }, {} as Record<string, T[]>);

  return Object.values(grouped).flat();
}

function percentsRating(rating: number) {
  return Math.round(rating) * 20;
}

function getMapPoints (offers: Offer[]) {
  const points = offers.map((offer) => ({
    id: offer.id,
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    zoom: offer.location.zoom,
  }));
  return points;
}

export {percentsRating, groupBy, getMapPoints};
