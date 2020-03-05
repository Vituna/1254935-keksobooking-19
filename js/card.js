'use strict';

(function () {

  var TypesRoomRus = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var Photo = {
    PHOTO_NAME: 'Фотография жилья',
    PHOTO_WIDTH: '45',
    PHOTO_HEIGHT: '40'
  };

  var template = document.querySelector('template');
  var adTemplate = template.content.querySelector('.map__card');
  var announcementCard = adTemplate.cloneNode(true);
  var popupClose = announcementCard.querySelector('.popup__close');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var getPhotoRoom = function (photoSrc, fragment) {
    var popupPhotoItem = document.createElement('img');
    popupPhotoItem.className = 'popup__photo';
    popupPhotoItem.src = photoSrc;
    popupPhotoItem.alt = Photo.PHOTO_NAME;
    popupPhotoItem.width = Photo.PHOTO_WIDTH;
    popupPhotoItem.height = Photo.PHOTO_HEIGHT;
    fragment.appendChild(popupPhotoItem);
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var createPhotosFragment = function (element) {
    var photosFragment = document.createDocumentFragment();
    var elemPhoto = element.offer.photos;
    var popupPhotos = announcementCard.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';
    if (elemPhoto.length === 0) {
      popupPhotos.style.display = 'none';
    } else {
      popupPhotos.style.display = 'block';
      elemPhoto.forEach(function (photoSrc) {
        getPhotoRoom(photoSrc, photosFragment);
      });
    }
    return photosFragment;
  };

  var getFeature = function (popapFeat, fragment) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + popapFeat;
    fragment.appendChild(featureItem);
  };

  var createFeatureFragment = function (element) {
    var featureFragment = document.createDocumentFragment();
    var elementFeatures = element.offer.features;
    var popupFeatures = announcementCard.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    if (elementFeatures.length === 0) {
      popupFeatures.style.display = 'none';
    } else {
      popupFeatures.style.display = 'block';
      elementFeatures.forEach(function (popapFeat) {
        getFeature(popapFeat, featureFragment);
      });
    }
    return featureFragment;
  };

  var createAd = function (card) {
    announcementCard.querySelector('.popup__avatar').src = card.author.avatar;
    announcementCard.querySelector('.popup__title').textContent = card.offer.title;
    announcementCard.querySelector('.popup__text--address').textContent = card.offer.address;
    announcementCard.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    announcementCard.querySelector('.popup__type').textContent = TypesRoomRus[card.offer.type];
    announcementCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    announcementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    announcementCard.querySelector('.popup__features').appendChild(createFeatureFragment(card));
    announcementCard.querySelector('.popup__photos').appendChild(createPhotosFragment(card));
    announcementCard.querySelector('.popup__description').textContent = card.offer.description;
    mapFiltersContainer.insertAdjacentElement('beforebegin', announcementCard);
    return announcementCard;
  };

  var onPopupClose = function () {
    announcementCard.remove();
  };

  var onPopupClik = function (evt) {
    window.utils.mouseClik(evt, onPopupClose);
  };

  var onPopupEsc = function (evt) {
    window.utils.keyEsc(evt, onPopupClose);
  };

  var onPopupEnter = function (evt) {
    window.utils.keyEnter(evt, onPopupClose);
  };

  popupClose.addEventListener('mousedown', onPopupClik);
  window.utils.map.addEventListener('keydown', onPopupEsc);
  window.utils.map.addEventListener('keydown', onPopupEnter);

  window.card = {
    createAd: createAd,
    removeCard: removeCard
  };

})();
