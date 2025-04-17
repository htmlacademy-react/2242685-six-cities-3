import {createSlice} from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Comments, FullOffer, Offers } from '../../types/types';
import { setError } from '../action';
import { fetchCommentsAction, fetchFavoritesAction, fetchFullOfferAction, fetchNearbyOffersAction, fetchOffersAction } from '../api-actions';

type InitalState = {
  offers: Offers | null;
  isOffersDataLoading: boolean;
  error: string | null;
  offer: FullOffer | null;
  nearOffers: Offers | null;
  comments: Comments | null;
  favorites: Offers | null;
}

const initialState: InitalState = {
  offers: [],
  isOffersDataLoading: false,
  error: null,
  offer: null,
  nearOffers: [],
  comments: [],
  favorites: [],
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchFullOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  }
});
