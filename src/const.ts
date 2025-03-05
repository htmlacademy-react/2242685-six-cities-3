const PLACES_COUNT = 13;
const CARDS_PER_PAGE = 5;

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

enum Page {
  MAIN = 'main',
  OFFER = 'offer',
  LOGIN = 'login',
  FAVORITES = 'favorites',
  PAGE404 = 'page404'
}

export {PLACES_COUNT, CARDS_PER_PAGE, CITIES, Page};
