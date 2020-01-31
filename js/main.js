'use strict';
var QUANTITY = 7;
var OFFER_TITLE = ['Сдается квартира', 'Сдается дом', 'Сдается студия', 'Сдается пентхауз', 'Продается гараж', 'Сдаются апартаменты', 'Помещение в аренду', 'Продается подвал'];
var ROOM_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADDITIONAL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var IMG_AVATARS = 'img/avatars/user0';
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
  MAX_PRICE: 100000
};

var cityMap = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getOffer = function (i) {
  var offer = {
    'author': {
      'avatar': IMG_AVATARS + (i + 1) + '.png'
    },
    'offer': {
      'title': OFFER_TITLE[i - 1],
      'address': 'x' + ',' + ' y',
      'price': getRandom(Price.MIN_PRICE, Price.MAX_PRICE),
      'type': getRandom(ROOM_TYPE),
      'rooms': getRandom(Rooms.MIN_ROOMS, Rooms.MAX_ROOMS),
      'guests': getRandom(Guest.MIN_GUEST, Guest.MAX_GUEST),
      'checkin': getRandom(CHECK_TIME),
      'checkout': getRandom(CHECK_TIME),
      'features': getRandom(ADDITIONAL_FEATURES),
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      'x': getRandom(LocationIcon.MIN_X, LocationIcon.MAX_X),
      'y': getRandom(LocationIcon.MIN_Y, LocationIcon.MAX_Y)
    }
  };

  return offer;

};

var renderPosts = function () {

  var posts = new Array(QUANTITY).map(getOffer);


  return posts;
};

var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';

  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;

  return pinElement;
};

var createPins = function (posts) {
  var fragment = document.createDocumentFragment();

  posts.forEach(function (i) {
    fragment.appendChild(renderPin(i));
  });

  mapPins.appendChild(fragment);
};

cityMap.classList.remove('map--faded');

createPins(renderPosts());
