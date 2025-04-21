import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCityName = (state: Pick<State, NameSpace.App>): string => state[NameSpace.App].cityName;
export const getSortOrder = (state: Pick<State, NameSpace.App>): string => state[NameSpace.App].sortOrder;
