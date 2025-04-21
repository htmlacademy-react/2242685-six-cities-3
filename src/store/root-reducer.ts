import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { appData } from './app-data/app-data';
import { appParams } from './app-params/app-params';

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData.reducer,
  [NameSpace.App]: appParams.reducer,
  [NameSpace.User]: userProcess.reducer,
});
