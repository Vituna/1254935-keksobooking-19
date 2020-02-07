'use strict';
var QUANTITY = 7;
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

var typesRoomRus = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var photo = {
  PHOTO_NAME: 'Фотография жилья',
  PHOTO_WIDTH: '45',
  PHOTO_HEIGHT: '40'
};
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
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArrElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getOffer = function (elem, i) {
  return {
    'author': {
      'avatar': IMG_AVATARS + (i + 1) + '.png'
    },
    'offer': {
      'title': OFFER_TITLE[i],
      'address': getRandom(LocationIcon.MIN_X, LocationIcon.MAX_X) + ', ' + getRandom(LocationIcon.MIN_Y, LocationIcon.MAX_Y),
      'price': getRandom(Price.MIN_PRICE, Price.MAX_PRICE),
      'type': getRandomArrElement(ROOM_TYPE),
      'rooms': getRandom(Rooms.MIN_ROOMS, Rooms.MAX_ROOMS),
      'guests': getRandom(Guest.MIN_GUEST, Guest.MAX_GUEST),
      'checkin': getRandomArrElement(CHECK_TIME),
      'checkout': getRandomArrElement(CHECK_TIME),
      'features': ADDITIONAL_FEATURES,
      'description': 'Описание',
      'photos': PHOTOS
    },
    'location': {
      'x': getRandom(LocationIcon.MIN_X, LocationIcon.MAX_X),
      'y': getRandom(LocationIcon.MIN_Y, LocationIcon.MAX_Y)
    }
  };
};

var renderPosts = function () {
  return new Array(QUANTITY).fill('').map(getOffer);
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

var createPins = function (offer) {
  var fragment = document.createDocumentFragment();

  offer.forEach(function (i) {
    fragment.appendChild(renderPin(i));
  });

  mapPins.appendChild(fragment);
};

var photoKom = function (photoSrc, fragm) {
  var popupPhotoItem = document.createElement('img');
  popupPhotoItem.className = 'popup__photo';
  popupPhotoItem.src = photoSrc;
  popupPhotoItem.alt = photo.PHOTO_NAME;
  popupPhotoItem.width = photo.PHOTO_WIDTH;
  popupPhotoItem.height = photo.PHOTO_HEIGHT;
  fragm.appendChild(popupPhotoItem);
};

var createPhotosFragment = function (elem) {
  var photosFragment = document.createDocumentFragment();
  var elemPhoto = elem.offer.photos;
  elemPhoto.forEach(function (photoSrc) {
    photoKom(photoSrc, photosFragment);
  });
  return photosFragment;
};

var feature = function (popapFeat, fragme) {
  var featureItem = document.createElement('li');
  featureItem.className = 'popup__feature popup__feature--' + popapFeat;
  fragme.appendChild(featureItem);
};

var createFeatureFragment = function (elem) {
  var featureFragment = document.createDocumentFragment();
  var elemFrag = elem.offer.features;
  elemFrag.forEach(function (popapFeat) {
    feature(popapFeat, featureFragment);
  });
  return featureFragment;
};

var renderPos = renderPosts();

var createAd = function (card) {
  var announcementCard = cardTemplate.cloneNode(true);
  announcementCard.querySelector('.popup__avatar').src = card.author.avatar;
  announcementCard.querySelector('.popup__title').textContent = card.offer.title;
  announcementCard.querySelector('.popup__text--address').textContent = card.offer.address;
  announcementCard.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  announcementCard.querySelector('.popup__type').textContent = typesRoomRus[card.offer.type];
  announcementCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  announcementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  announcementCard.querySelector('.popup__features').innerHTML = '';
  announcementCard.querySelector('.popup__features').appendChild(createFeatureFragment(card));
  announcementCard.querySelector('.popup__photos').removeChild(announcementCard.querySelector('.popup__photo'));
  announcementCard.querySelector('.popup__photos').appendChild(createPhotosFragment(card));
  announcementCard.querySelector('.popup__description').textContent = card.offer.description;

  return announcementCard;
};

var createCards = function () {
  var fragment = document.createDocumentFragment();

  renderPos.forEach(function (arr, i) {
    fragment.appendChild(createAd(renderPos[i]));
  });

  cityMap.insertBefore(fragment, mapFiltersContainer);
};

cityMap.classList.remove('map--faded');

createPins(renderPosts());

createCards(renderPos);


