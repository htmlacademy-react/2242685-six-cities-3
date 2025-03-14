import { Offers } from '../types/types';

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
    'isFavorite': true,
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
    'isFavorite': true,
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
    'isFavorite': true,
    'isPremium': true,
    'rating': 4.2
  },
  {
    'id': '4fc17644-7333-428a-bd4b-35d3e959b4a8',
    'title': 'Amazing and Extremely Central Flat',
    'type': 'house',
    'price': 926,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/16.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.868610000000004,
      'longitude': 2.342499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 1.6
  },
  {
    'id': '38e18eb6-8c1c-4f7f-b2c9-823fbb6f2b99',
    'title': 'The house among olive ',
    'type': 'house',
    'price': 884,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/1.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.858610000000006,
      'longitude': 2.330499,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4.9
  },
  {
    'id': '76e18017-33ac-42ae-90ed-62def068ebbc',
    'title': 'Wood and stone place',
    'type': 'house',
    'price': 904,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/13.jpg',
    'city': {
      'name': 'Paris',
      'location': {
        'latitude': 48.85661,
        'longitude': 2.351499,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 48.834610000000005,
      'longitude': 2.335499,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 2
  },
  {
    'id': '969c0de8-8434-4702-8666-7f830df45ef0',
    'title': 'Wood and stone place',
    'type': 'room',
    'price': 121,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/3.jpg',
    'city': {
      'name': 'Cologne',
      'location': {
        'latitude': 50.938361,
        'longitude': 6.959974,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 50.950361,
      'longitude': 6.961974,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 3.3
  },
  {
    'id': '27a8dddc-19fb-4b6d-9c58-43336ee148af',
    'title': 'Amazing and Extremely Central Flat',
    'type': 'room',
    'price': 122,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    'city': {
      'name': 'Cologne',
      'location': {
        'latitude': 50.938361,
        'longitude': 6.959974,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 50.932361,
      'longitude': 6.937974,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.9
  },
];

export { offers };
