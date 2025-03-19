import {createAction} from '@reduxjs/toolkit';

export const selectCity = createAction('selectCity', (cityName: string) => ({
  payload: cityName,
}));

export const filterOffers = createAction('filterOffers');
