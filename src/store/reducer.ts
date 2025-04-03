import { createReducer } from '@reduxjs/toolkit';
import { CITIES, SortOrder, AuthorizationStatus } from '../const';
import { selectCity, selectSortOrder, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setUserData, loadOffer, loadNearOffers, loadComments } from './action';
import { Offer, Offers, Comments } from '../types/types';
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
  offer: Offer | null;
  nearOffers: Offers;
  comments: Comments;
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
};

const reducer = createReducer(initialState, (builder) => {
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload; // UserData?
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export {reducer};
