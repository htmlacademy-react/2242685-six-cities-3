import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, NameSpace, SortOrder } from '../../const';

const initialCity = CITIES[0]; //Paris
const initialSortOrder = SortOrder.Popular;

type InitialState = {
  cityName: string;
  sortOrder: string;
};

const initialState: InitialState = {
  cityName: initialCity,
  sortOrder: initialSortOrder,
};

export const appParams = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    selectSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {selectCity, selectSortOrder} = appParams.actions;
