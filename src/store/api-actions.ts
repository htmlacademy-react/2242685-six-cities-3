import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { loadOffers, requireAuthorization } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import { Offers } from '../types/types.js';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'data/fetchOffers',
   async (_arg, {dispatch, extra: api}) => {
     const {data} = await api.get<Offers>(APIRoute.Offers);
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

export const loginAction = createAsyncThunk<void, AuthData, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'user/login',
   async ({email, password}, {dispatch, extra: api}) => {
     const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
     saveToken(token);
     dispatch(requireAuthorization(AuthorizationStatus.Auth));
   },
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
   },
 );
