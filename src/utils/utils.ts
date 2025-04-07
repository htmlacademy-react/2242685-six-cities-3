import { Offer, Point } from '../types/types';
import { store } from '../store';
import { selectCity } from '../store/action';
import { fetchFavoritesAction, setFavoriteStatus } from '../store/api-actions';
import { MouseEventHandler } from 'react';

export function percentsRating(rating: number) {
  return Math.round(rating) * 20;
}

export function mapOffersToMapPoints(offers: Offer[]) {
  const points: Point[] = offers.map((offer) => ({
    id: offer.id,
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    zoom: offer.location.zoom,
  }));
  return points;
}

export const handleCityClick = (cityName: string) => () => {
  store.dispatch(selectCity(cityName));
};

export function getRandomIntFromRange(min: number, max: number) {
  min = Math.ceil(min); // округляем минимальное значение вверх
  max = Math.floor(max); // округляем максимальное значение вниз
  return Math.floor(Math.random() * (max - min)) + min;
}

export const handleFavoriteButtonClick = (offerId: string | undefined, status: number): MouseEventHandler<HTMLButtonElement> => () => {
  store.dispatch(setFavoriteStatus([offerId, status]))
    .then(() => {
      store.dispatch(fetchFavoritesAction());
    });
};
