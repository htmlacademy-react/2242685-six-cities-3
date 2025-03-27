import { createReducer } from '@reduxjs/toolkit';
import { CITIES, SortOrder, AuthorizationStatus } from '../const';
import { selectCity, selectSortOrder, loadOffers, requireAuthorization, setError } from './action';
import { Offer } from '../types/types';

const initialCity = CITIES[0]; //Paris
const initialSortOrder = SortOrder.Popular;

type InitalState = {
  cityName: string;
  sortOrder: string;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitalState = {
  cityName: initialCity,
  sortOrder: initialSortOrder,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
