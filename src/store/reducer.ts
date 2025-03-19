import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { CITIES } from '../const';
import { selectCity, filterOffers } from './action';

const initialState = {
  city: CITIES[0],
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state) => {
      state.city = CITIES[0]; //CITIES[0] заменить на выбранный город
    })
    .addCase(filterOffers, (state) => {
      state.offers = offers.filter((offer) => offer.city.name === state.city);
    });
});

export {reducer};
