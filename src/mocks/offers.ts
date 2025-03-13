import { Offers } from '../types/types';

// 52.3909553943508, 4.85309666406198
// 52.3609553943508, 4.85309666406198
// 52.3909553943508, 4.929309666406198
// 52.3809553943508, 4.939309666406198

const offers: Offers =
[
  {
    'id': '962beea6-9eba-4841-8a2f-2f4e3649b823',
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'type': 'house',
    'price': 208,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/19.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3909553943508, //52.36554
      'longitude': 4.85309666406198, //4.911976
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.2
  },
  {
    'id': '9b403a53-6791-40f1-a8f5-9bbebedb452f',
    'title': 'The Joshua Tree House',
    'type': 'room',
    'price': 203,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/6.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3609553943508, //52.385540000000006
      'longitude': 4.85309666406198, //4.902976
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.4
  },
  {
    'id': '2955158f-b7db-4471-b680-716c0d87d13d',
    'title': 'Waterfront with extraordinary view',
    'type': 'room',
    'price': 191,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/7.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3909553943508, //52.397540000000006
      'longitude': 4.929309666406198, //4.9099759999999995
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 2.4
  },
  {
    'id': 'c307b6fa-039c-45ce-9761-257da4ce9df5',
    'title': 'House in countryside',
    'type': 'apartment',
    'price': 376,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/2.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3809553943508, //52.37454
      'longitude': 4.929309666406198, //4.881976
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.2
  },
];

export { offers };
