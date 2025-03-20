import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { CITIES } from '../const';
import { selectCity, filterOffers } from './action';

const initialCity = CITIES[0]; //Paris

const initialState = {
  cityName: initialCity,
  cityOffers: offers.filter((offer) => offer.city.name === initialCity),
  //selectedOffer: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(filterOffers, (state) => {
      state.cityOffers = offers.filter((offer) => offer.city.name === state.cityName);
    });
});

export {reducer};
