import { createAction } from '@reduxjs/toolkit';
import { Page } from '../const';

export const setError = createAction<string | null>('setError');

export const redirectToRoute = createAction<Page>('redirectToRoute');

