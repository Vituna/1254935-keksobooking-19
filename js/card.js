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

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');
  var announcementCard = mapCard.cloneNode(true);
  var popupClose = announcementCard.querySelector('.popup__close');

  window.card = {
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

    createAd: function (card) {
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
    }

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

  var mouseClikClosePopup = function (evt) {
    window.utils.mouseClik(evt, announcementCard.remove());
  };

  var keyClosePopup = function (evt) {
    window.utils.keyEsc(evt, announcementCard);
  };


  var keyClose = function (evt) {
    window.utils.keyEnter(evt, announcementCard.remove());

  };

  window.removeCrads = {
    removeCard: function () {
      var mapChildren = [].slice.call(map.children);
      mapChildren.forEach(function (el) {
        if (el.classList.contains('map__card')) {
          el.remove();
        }
      });
    }
  };

  popupClose.addEventListener('keydown', keyClose);
  popupClose.addEventListener('mousedown', mouseClikClosePopup);

  map.addEventListener('keydown', keyClosePopup);


})();
