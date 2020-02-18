'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var isActivate = true;


  var param = function (activDeactiv) {
    adFormElements.forEach(function (activ) {
      activ.disabled = activDeactiv;
    });
  };

  var mouseClikOpenPopup = function (evt) {
    window.utils.mouseClik(evt, window.page.activatePage());
  };

  var keyOpenActivation = function (evt) {
    window.utils.keyEnter(evt, window.page.activatePage());
  };

  window.page = {
    activatePage: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      param(false);
      if (isActivate) {
        window.pins.createPins(window.pins.renderPosts());
        isActivate = false;
      }
    },

    deactivatePage: function () {
      map.classList.toggle('map--faded');
      adForm.classList.toggle('ad-form--disabled');
      param(true);
      window.card.removeCard();
      window.pins.removePins();
      isActivate = true;
    }
  };

  mapPinMain.addEventListener('mousedown', mouseClikOpenPopup);
  mapPinMain.addEventListener('keydown', keyOpenActivation);

})();
