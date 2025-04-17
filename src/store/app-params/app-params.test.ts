import { CITIES, SortOrder } from '../../const';
import { appParams } from './app-params';

describe('appParams Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { cityName: CITIES[1], sortOrder: SortOrder.TopRatedFirst };

    const result = appParams.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { cityName: CITIES[0], sortOrder: SortOrder.Popular };

    const result = appParams.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

});
