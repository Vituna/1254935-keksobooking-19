'use strict';
var QUANTITY = 7;
var OFFER_TITLE = ['Сдается квартира', 'Сдается дом', 'Сдается студия', 'Сдается пентхауз', 'Продается гараж', 'Сдаются апартаменты', 'Помещение в аренду', 'Продается подвал'];
var ROOM_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADDITIONAL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var cityMap = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArrElement = function (arr) {
  var element = Math.floor(Math.random() * arr.length);
  return arr[element];
};

var renderPosts = function () {
  var posts = [];
  for (var i = 0; i <= QUANTITY; i++) {
    posts.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': OFFER_TITLE[i - 1],
        'address': 'x' + ',' + ' y',
        'price': getRandom(100, 1000000),
        'type': getRandomArrElement(ROOM_TYPE),
        'rooms': getRandom(1, 10),
        'guests': getRandom(1, 15),
        'checkin': getRandomArrElement(CHECK_TIME),
        'checkout': getRandomArrElement(CHECK_TIME),
        'features': getRandomArrElement(ADDITIONAL_FEATURES),
        'description': '',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      'location': {
        'x': getRandom(300, 900),
        'y': getRandom(130, 630)
      }
    });
  }
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

