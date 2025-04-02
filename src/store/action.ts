import { createAction } from '@reduxjs/toolkit';
import { SortOrder, Page } from '../const';
import { Offers, Offer } from '../types/types';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';

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

export const redirectToRoute = createAction<Page>('redirectToRoute');

export const setUserData = createAction<UserData | null>('setUserData');

export const loadOffer = createAction<Offer>('data/loadOffer');
