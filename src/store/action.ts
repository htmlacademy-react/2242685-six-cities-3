import {createAction} from '@reduxjs/toolkit';
import { SortOrder } from '../const';

export const selectCity = createAction('selectCity', (cityName: string) => ({
  payload: cityName,
}));

export const selectSortOrder = createAction('selectSortOrder', (sortOrder: SortOrder) => ({
  payload: sortOrder,
}));
