export const CARDS_PER_PAGE = 5;
export const URL_MARKER_DEFAULT = 'markup/img/pin.svg';
export const URL_MARKER_CURRENT = 'markup/img/pin-active.svg';

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export enum Page {
  Main = '', //main
  Offer = 'offer',
  Login = 'login',
  Favorites = 'favorites',
  Page404 = 'page404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortOrder {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments/{offerId}',
  Login = '/login',
  Logout = '/logout',
}
