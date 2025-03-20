import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { CITIES } from '../const';
import { selectCity } from './action';

const initialCity = CITIES[0]; //Paris

const initialState = {
  cityName: initialCity,
  offers: offers,
  //selectedOffer: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.cityName = action.payload;
      state.offers = offers.filter((offer) => offer.city.name === action.payload);
    });
});

// .addCase(filterOffers, (state) => {
//   state.offers = offers.filter((offer) => offer.city.name === state.cityName);
// })

export {reducer};
