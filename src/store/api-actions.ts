import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, redirectToRoute, setUserData } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR, Page } from '../const';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import { Offers } from '../types/types.js';
import { store } from './';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'data/fetchOffers',
   async (_arg, {dispatch, extra: api}) => {
     dispatch(setOffersDataLoadingStatus(true));
     const {data} = await api.get<Offers>(APIRoute.Offers);
     dispatch(setOffersDataLoadingStatus(false));
     dispatch(loadOffers(data));
   },
 );

export const checkAuthAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'user/checkAuth',
   async (_arg, {dispatch, extra: api}) => {
     try {
       await api.get(APIRoute.Login);
       dispatch(requireAuthorization(AuthorizationStatus.Auth));
     } catch {
       dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
     }
   },
 );

export const loginAction = createAsyncThunk<
 void,
 AuthData,
 {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }
>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const response = await api.post<UserData>(APIRoute.Login, {email, password});
    const {token} = response.data;

    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(response.data));
    dispatch(redirectToRoute(Page.Main));
  }
);


export const logoutAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'user/logout',
   async (_arg, {dispatch, extra: api}) => {
     await api.delete(APIRoute.Logout);
     dropToken();
     dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
     dispatch(setUserData(null));
   },
 );
