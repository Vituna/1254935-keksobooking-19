'use strict';

(function () {

  var isActivate = true;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('.ad-form__element');

  var onLoadSuccess = function (adData) {
    window.filter.activateFiltration(adData);
  };

  var findsFieldsetsDisconnects = function (disconnect) {
    fieldsets.forEach(function (disa) {
      disa.disabled = disconnect;
    });
  };
  findsFieldsetsDisconnects(true);

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
    }
  };

  var activatePage = function () {
    window.backend.load(onLoadSuccess);
    if (isActivate) {
      toggleActivation();
      findsFieldsetsDisconnects(false);
      isActivate = false;
    }
  };

  mapPinMain.addEventListener('mousedown', onPopupClik);
  mapPinMain.addEventListener('keydown', onPinEnter);

  window.page = {
    deactivatePage: function () {
      toggleActivation();
      findsFieldsetsDisconnects(true);
      isActivate = true;
      removeCard();
      removePins();
      window.filter.deactivateFiltration();
      window.pins.defaultPins();
    }
  };

})();
