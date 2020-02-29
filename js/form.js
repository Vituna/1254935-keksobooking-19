'use strict';

(function () {
  var MIN_NAME_LENGTH = 30;
  var MAX_NAME_LENGTH = 100;
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var MinPriceTypes = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var fieldsets = document.querySelectorAll('.ad-form__element');
  var adFormReset = document.querySelector('.ad-form__reset');
  var adAddress = document.querySelector('#address');
  var addTitle = document.querySelector('#title');
  var adPrice = document.querySelector('#price');
  var addType = document.querySelector('#type');
  var adTimein = document.querySelector('#timein');
  var adTimeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacityRoom = document.querySelector('#capacity');

  var findsFieldsetsDisconnects = function (disconnect) {
    fieldsets.forEach(function (data) {
      data.disabled = disconnect;
    });
  };

  adAddress.value = Math.floor(window.utils.mapPinMain.offsetLeft + window.utils.mapPinMain.offsetWidth / 2) + ', ' + Math.floor(window.utils.mapPinMain.offsetTop + window.utils.mapPinMain.offsetHeight);

  var getMapPinMainCoords = function () {
    var mapPinMainPosition = {
      x: window.utils.mapPinMain.offsetLeft + Math.floor(window.utils.mapPinMain.offsetWidth / 2),
      y: window.utils.mapPinMain.offsetTop + window.utils.mapPinMain.offsetHeight
    };
    return mapPinMainPosition;
  };

  var fillAddress = function () {
    var addressInputCoords = getMapPinMainCoords();
    adAddress.value = addressInputCoords.x + ', ' + addressInputCoords.y;
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

  var setPriceMin = function (input, data) {
    input.min = data;
    input.placeholder = data;
  };

  addType.addEventListener('change', function (evt) {
    setPriceMin(adPrice, MinPriceTypes[evt.target.value]);
  });

  adTimein.addEventListener('change', function (evt) {
    adTimeout.value = evt.target.value;
  });

  adTimeout.addEventListener('change', function (evt) {
    adTimein.value = evt.target.value;
  });

  adFormReset.addEventListener('mousedown', window.page.deactivatePage);
  roomNumber.addEventListener('change', onRoomNumberChange);

  findsFieldsetsDisconnects(true);


  window.form = {
    findsFieldsetsDisconnects: findsFieldsetsDisconnects,
    fillAddress: fillAddress
  };


})();
