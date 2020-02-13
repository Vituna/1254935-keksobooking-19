'use strict';

var POSITION_X = 30;
var POSITION_Y = 40;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var MIN_NAME_LENGTH = 30;
var MAX_NAME_LENGTH = 100;
var MOUSE_LEFT_BUTTON = 0;
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
var ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

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
  MAX_PRICE: 10000
};
var isActivate = true;
var mapPinMainPositionX;
var mapPinMainPositionY;

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapPinMain = map.querySelector('.map__pin--main');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapCard = document.querySelector('#card').content.querySelector('.map__card');
var announcementCard = mapCard.cloneNode(true);
var popupClose = announcementCard.querySelector('.popup__close');
var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var adFormReset = adForm.querySelector('.ad-form__reset');
var addTitle = document.querySelector('#title');
var adPrice = document.querySelector('#price');
var addType = document.querySelector('#type');
var adTimein = document.querySelector('#timein');
var adTimeout = document.querySelector('#timeout');
var adAddress = document.querySelector('#address');
var roomNumber = document.querySelector('#room_number');
var capacityRoom = document.querySelector('#capacity');

adAddress.disabled = true;

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
  var pinElement = mapPin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';

  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;

  var pinClik = function () {
    if (mapCard) {
      mapCard.remove();
    }
    createAd(pin);
  };

  var mouseClikPin = function (evt) {
    if (evt.button === MOUSE_LEFT_BUTTON) {
      pinClik();
    }
  };
  var keyEnterPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      pinClik();
    }
  };

  pinElement.addEventListener('keydown', keyEnterPress);
  pinElement.addEventListener('mousedown', mouseClikPin);

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
  announcementCard.querySelector('.popup__photos').innerHTML = '';
};

var createPhotosFragment = function (elem) {
  var photosFragment = document.createDocumentFragment();
  var elemPhoto = elem.offer.photos;
  elemPhoto.forEach(function (photoSrc) {
    photoKom(photoSrc, photosFragment);
  });
  return photosFragment;
};

var getFeature = function (popapFeat, fragme) {
  var featureItem = document.createElement('li');
  featureItem.className = 'popup__feature popup__feature--' + popapFeat;
  fragme.appendChild(featureItem);
  announcementCard.querySelector('.popup__features').innerHTML = '';
};

var createFeatureFragment = function (elem) {
  var featureFragment = document.createDocumentFragment();
  var elemFrag = elem.offer.features;
  elemFrag.forEach(function (popapFeat) {
    getFeature(popapFeat, featureFragment);

  });
  return featureFragment;
};

var createAd = function (card) {
  announcementCard.querySelector('.popup__avatar').src = card.author.avatar;
  announcementCard.querySelector('.popup__title').textContent = card.offer.title;
  announcementCard.querySelector('.popup__text--address').textContent = card.offer.address;
  announcementCard.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  announcementCard.querySelector('.popup__type').textContent = typesRoomRus[card.offer.type];
  announcementCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  announcementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  announcementCard.querySelector('.popup__features').appendChild(createFeatureFragment(card));
  announcementCard.querySelector('.popup__photos').appendChild(createPhotosFragment(card));
  announcementCard.querySelector('.popup__description').textContent = card.offer.description;

  mapFiltersContainer.insertAdjacentElement('beforebegin', announcementCard);


  return announcementCard;
};

var param = function (activDeactiv) {
  adFormElements.forEach(function (activ) {
    activ.disabled = activDeactiv;
  });
};

var activationForm = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  param(false);
  if (isActivate) {
    createPins(renderPosts());
    isActivate = false;
  }
};

var onMainPintEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activationForm();
    announcementCard.remove();
  }
};

var mouseClik = function (evt) {
  if (evt.button === MOUSE_LEFT_BUTTON) {
    activationForm();
    announcementCard.remove();
  }
};

var popupCloseKey = function (evt) {
  if (evt.key === ESC_KEY) {
    announcementCard.remove();
  }
};

var fillAddressInput = function () {
  var getElementPosition = function (posX, posY, obj) {
    posX = obj.offsetLeft + POSITION_X;
    posY = obj.offsetTop + POSITION_Y;
    return posX + ', ' + posY;
  };
  adAddress.value = getElementPosition(mapPinMainPositionX, mapPinMainPositionY, mapPinMain);
};

var onRoomNumberChange = function () {
  if (capacityRoom.options.length) {
    [].forEach.call(capacityRoom.options, function (item) {
      item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value) ? true : false;
      item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
    });
  } else {
    capacityRoom.setCustomValidity('');
  }
};

var removeCard = function () {
  var mapChildren = [].slice.call(map.children);
  mapChildren.forEach(function (el) {
    if (el.classList.contains('map__card')) {
      el.remove();
    }
  });
};

var removePins = function () {
  var mapPinsChildren = [].slice.call(mapPins.children);
  mapPinsChildren.forEach(function (el) {
    if (el.classList.contains('map__pin') && !el.classList.contains('map__pin--main')) {
      el.remove();
    }
  });
};

var deactivationForm = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  param(true);
  removeCard();
  removePins();
  isActivate = true;
};

var headline = function () {
  if (addTitle.validity.tooShort) {
    addTitle.setCustomValidity('Минимальная длина - ' + MIN_NAME_LENGTH + ' символов');
  } else if (addTitle.validity.tooLong) {
    addTitle.setCustomValidity('Максимальная длина - ' + MAX_NAME_LENGTH + ' символов');
  } else if (addTitle.validity.valueMissing) {
    addTitle.setCustomValidity('Обязательное текстовое поле');
  } else {
    addTitle.setCustomValidity('');
  }
};

addTitle.addEventListener('invalid', headline);

addType.addEventListener('change', function (evt) {
  switch (evt.target.value) {
    case 'bungalo':
      adPrice.min = 0;
      adPrice.placeholder = '0';
      break;
    case 'flat':
      adPrice.min = 1000;
      adPrice.placeholder = '1000';
      break;
    case 'house':
      adPrice.min = 5000;
      adPrice.placeholder = '5000';
      break;
    case 'palace':
      adPrice.min = 10000;
      adPrice.placeholder = '10000';
      break;
  }
});

adTimein.addEventListener('change', function (evt) {
  adTimeout.value = evt.target.value;
});

adTimeout.addEventListener('change', function (evt) {
  adTimein.value = evt.target.value;
});

for (var t = 0; t < adFormElements.length; t++) {
  adFormElements[t].setAttribute('disabled', 'disabled');
}

popupClose.addEventListener('keydown', onMainPintEnterPress);
popupClose.addEventListener('mousedown', mouseClik);

map.addEventListener('keydown', popupCloseKey);

mapPinMain.addEventListener('mousedown', mouseClik);
mapPinMain.addEventListener('keydown', onMainPintEnterPress);

roomNumber.addEventListener('change', onRoomNumberChange);

adFormReset.addEventListener('mousedown', deactivationForm);

fillAddressInput();
