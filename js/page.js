'use strict';

(function () {

  var isActivate = true;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('.ad-form__element');

  var onLoadError = function (errorMessage) {
    window.error.renderErrorMessage(errorMessage);
  };
  var onLoadSuccess = function (adData) {
    window.pins.renderPins(adData);
  };

  var findsFieldsetsDisconnects = function (Disconnect) {
    fieldsets.forEach(function (disable) {
      disable.disabled = Disconnect;
    });
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var removePins = function () {
    var mapPinsChildren = [].slice.call(mapPins.children);
    mapPinsChildren.forEach(function (el) {
      if (el.classList.contains('map__pin') && !el.classList.contains('map__pin--main')) {
        el.remove();
      }
    });
  };
  var onPopupClik = function (evt) {
    window.utils.mouseClik(evt, activatePage());

  };

  var onPinEnter = function (evt) {
    window.utils.keyEnter(evt, activatePage);
  };

  var toggleActivation = function () {
    if (window.utils.mouseClik) {
      map.classList.toggle('map--faded');
      adForm.classList.toggle('ad-form--disabled');
      findsFieldsetsDisconnects(false);
    }
  };

  var activatePage = function () {
    window.backend.load(onLoadSuccess, onLoadError);
    if (isActivate) {
      toggleActivation();
      isActivate = false;
    }
  };

  mapPinMain.addEventListener('mousedown', onPopupClik);
  mapPinMain.addEventListener('keydown', onPinEnter);

  window.page = {
    deactivatePage: function () {
      toggleActivation();
      isActivate = true;
      removeCard();
      removePins();
      window.pins.defaultPins();
    }
  };

})();
