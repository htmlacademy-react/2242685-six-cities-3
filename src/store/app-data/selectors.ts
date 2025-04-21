import { nanoid } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Comments, CommentsToDisplay, FullOffer, Offers } from '../../types/types';

const MAX_COMMENTS = 10;

export const getOffers = (state: State): Offers | null => state[NameSpace.Data].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getFullOffer = (state: State): FullOffer | null => state[NameSpace.Data].offer;
export const getError = (state: State): string | null => state[NameSpace.Data].error;
export const getNearOffers = (state: State): Offers | null => state[NameSpace.Data].nearOffers;
export const getComments = (state: State): Comments | null => state[NameSpace.Data].comments;
export const getFavorites = (state: State): Offers | null => state[NameSpace.Data].favorites;

export const getFormattedComments = (state: State): CommentsToDisplay | null => {
  const comments = getComments(state);

  if (!comments || comments.length === 0) {
    return null;
  }

  const sortedComments = [...comments].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sortedComments
    .slice(0, MAX_COMMENTS)
    .map((comment) => ({
      ...comment,
      commentId: nanoid(),
    }));
};
