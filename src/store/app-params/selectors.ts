import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCityName = (state: State): string => state[NameSpace.App].cityName;
export const getSortOrder = (state: State): string => state[NameSpace.App].sortOrder;
