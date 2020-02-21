'use strict';

(function () {

  var isActivate = true;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('.ad-form__element');

  var findsFieldsetsDisconnects = function (activDeactiv) {
    fieldsets.forEach(function (activ) {
      activ.disabled = activDeactiv;
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
  var mouseClikOpenPopup = function (evt) {
    window.utils.mouseClik(evt, activatePage());

  };

  var keyEnterActivation = function (evt) {
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
    if (isActivate) {
      toggleActivation();
      window.pins.renderPosts(window.pins.createPins());
      isActivate = false;

    }
  };

  mapPinMain.addEventListener('mousedown', mouseClikOpenPopup);
  mapPinMain.addEventListener('keydown', keyEnterActivation);

  window.page = {
    deactivatePage: function () {
      toggleActivation();
      isActivate = true;
      removeCard();
      removePins();
    }
  };

})();
