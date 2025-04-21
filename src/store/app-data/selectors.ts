import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Comments, FullOffer, Offers } from '../../types/types';

export const getOffers = (state: State): Offers | null => state[NameSpace.Data].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getFullOffer = (state: State): FullOffer | null => state[NameSpace.Data].offer;
export const getError = (state: State): string | null => state[NameSpace.Data].error;
export const getNearOffers = (state: State): Offers | null => state[NameSpace.Data].nearOffers;
export const getComments = (state: State): Comments | null => state[NameSpace.Data].comments;
export const getFavorites = (state: State): Offers | null => state[NameSpace.Data].favorites;
