'use strict';

(function () {
  var POSITION_X = 30;
  var POSITION_Y = 40;
  var MIN_NAME_LENGTH = 30;
  var MAX_NAME_LENGTH = 100;
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var mapPinMainPositionX;
  var mapPinMainPositionY;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
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

  var setPrice = function (evt) {
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
  };

  addType.addEventListener('change', setPrice);

  adTimein.addEventListener('change', function (evt) {
    adTimeout.value = evt.target.value;
  });

  adTimeout.addEventListener('change', function (evt) {
    adTimein.value = evt.target.value;
  });

  adFormReset.addEventListener('mousedown', window.page.deactivatePage);
  roomNumber.addEventListener('change', onRoomNumberChange);

  fillAddressInput();

})();
