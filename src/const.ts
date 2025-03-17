const CARDS_PER_PAGE = 5;
const URL_MARKER_DEFAULT = 'markup/img/pin.svg';
const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

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

export { CARDS_PER_PAGE, CITIES, Page, AuthStatus,URL_MARKER_DEFAULT, URL_MARKER_CURRENT};
