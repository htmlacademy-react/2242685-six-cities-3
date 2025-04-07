import { createReducer } from '@reduxjs/toolkit';
import { CITIES, SortOrder, AuthorizationStatus } from '../const';
import { selectCity, selectSortOrder, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData, loadOffer, loadNearOffers, loadComments, loadFavorites } from './action';
import { Offers, Comments, FullOffer } from '../types/types';
import { UserData } from '../types/user-data';

const initialCity = CITIES[0]; //Paris
const initialSortOrder = SortOrder.Popular;

type InitalState = {
  cityName: string;
  sortOrder: string;
  offers: Offers;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  isOffersDataLoading: boolean;
  error: string | null;
  offer: FullOffer | null;
  nearOffers: Offers | null;
  comments: Comments;
  favorites: Offers | null;
}

const initialState: InitalState = {
  cityName: initialCity,
  sortOrder: initialSortOrder,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  isOffersDataLoading: false,
  error: null,
  offer: null,
  nearOffers: [],
  comments: [],
  favorites: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(selectSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
