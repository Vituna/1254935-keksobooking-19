'use strict';

(function () {

  var OFFER_TITLE = ['Сдается квартира', 'Сдается дом', 'Сдается студия', 'Сдается пентхауз', 'Продается гараж', 'Сдаются апартаменты', 'Помещение в аренду', 'Продается подвал'];
  var ROOM_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ADDITIONAL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var CHECK_TIME = ['12:00', '13:00', '14:00'];
  var IMG_AVATARS = 'img/avatars/user0';
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'

  ];

  var LocationIcon = {
    MIN_X: 0,
    MAX_X: 1100,
    MIN_Y: 130,
    MAX_Y: 630
  };
  var Rooms = {
    MIN_ROOMS: 1,
    MAX_ROOMS: 10
  };
  var Guest = {
    MIN_GUEST: 1,
    MAX_GUEST: 15
  };
  var Price = {
    MIN_PRICE: 1000,
    MAX_PRICE: 10000
  };


  window.data = {
    getOffer: function (elem, i) {
      return {
        'author': {
          'avatar': IMG_AVATARS + (i + 1) + '.png'
        },
        'offer': {
          'title': OFFER_TITLE[i],
          'address': window.utils.getRandom(LocationIcon.MIN_X, LocationIcon.MAX_X) + ', ' + window.utils.getRandom(LocationIcon.MIN_Y, LocationIcon.MAX_Y),
          'price': window.utils.getRandom(Price.MIN_PRICE, Price.MAX_PRICE),
          'type': window.utils.getRandomArrElement(ROOM_TYPE),
          'rooms': window.utils.getRandom(Rooms.MIN_ROOMS, Rooms.MAX_ROOMS),
          'guests': window.utils.getRandom(Guest.MIN_GUEST, Guest.MAX_GUEST),
          'checkin': window.utils.getRandomArrElement(CHECK_TIME),
          'checkout': window.utils.getRandomArrElement(CHECK_TIME),
          'features': ADDITIONAL_FEATURES,
          'description': 'Описание',
          'photos': PHOTOS
        },
        'location': {
          'x': window.utils.getRandom(LocationIcon.MIN_X, LocationIcon.MAX_X),
          'y': window.utils.getRandom(LocationIcon.MIN_Y, LocationIcon.MAX_Y)
        }
      };
    },
  };

})();
