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
  Main = '', //main
  Offer = 'offer',
  Login = 'login',
  Favorites = 'favorites',
  Page404 = 'page404'
}

enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export {PLACES_COUNT, CARDS_PER_PAGE, CITIES, Page, AuthStatus,URL_MARKER_DEFAULT, URL_MARKER_CURRENT};
