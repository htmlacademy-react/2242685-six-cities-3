import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { CITIES, SortOrder } from '../const';
import { selectCity, selectSortOrder } from './action';

const initialCity = CITIES[0]; //Paris
const initialSortOrder = SortOrder.Popular;

const initialState = {
  cityName: initialCity,
  sortOrder: initialSortOrder,
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(selectSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    });
});

export {reducer};
