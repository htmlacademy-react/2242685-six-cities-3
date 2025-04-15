import { createAction } from '@reduxjs/toolkit';
import { Page } from '../const';
// import { CommentToPost } from '../types/types';
// import { UserData } from '../types/user-data';

export const setError = createAction<string | null>('setError');

export const redirectToRoute = createAction<Page>('redirectToRoute');

// export const setUserData = createAction<UserData | null>('setUserData');
// export const postComment = createAction<CommentToPost | null>('data/postComment');
