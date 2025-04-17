import { CITIES, NameSpace, SortOrder } from '../../const';
import { getCityName, getSortOrder } from './selectors';

describe('appParams selectors', () => {
  const state = {
    [NameSpace.App]: {
      cityName: CITIES[1],
      sortOrder: SortOrder.TopRatedFirst,
    }
  };

  it('should return cityName from state', () => {
    const { cityName } = state[NameSpace.App];
    const result = getCityName(state);
    expect(result).toBe(cityName);
  });

  it('should return sortOrder number from state', () => {
    const { sortOrder } = state[NameSpace.App];
    const result = getSortOrder(state);
    expect(result).toBe(sortOrder);
  });
});
