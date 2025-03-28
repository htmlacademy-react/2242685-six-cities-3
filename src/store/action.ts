import { createAction } from '@reduxjs/toolkit';
import { SortOrder } from '../const';
import { Offers } from '../types/types';
import { AuthorizationStatus } from '../const';

export const selectCity = createAction('selectCity', (cityName: string) => ({
  payload: cityName,
}));

export const selectSortOrder = createAction('selectSortOrder', (sortOrder: SortOrder) => ({
  payload: sortOrder,
}));

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('setError');
