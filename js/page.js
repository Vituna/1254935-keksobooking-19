'use strict';

(function () {

  var isActivate = true;


  var onLoadSuccess = function (adData) {
    window.filter.activateFiltration(adData);
  };

  var onPopupClik = function (evt) {
    window.utils.mouseClik(evt, activatePage);
  };

  var onPinEnter = function (evt) {
    window.utils.keyEnter(evt, activatePage);
  };

  var toggleActivation = function () {
    if (window.utils.mouseClik) {
      window.utils.map.classList.toggle('map--faded');
      window.utils.adForm.classList.toggle('ad-form--disabled');
    }
  };

  var activatePage = function () {
    window.backend.load(onLoadSuccess);
    if (isActivate) {
      toggleActivation();
      window.form.findsFieldsetsDisconnects(false);
      isActivate = false;
    }
  };

  var deactivatePage = function () {
    toggleActivation();
    window.form.findsFieldsetsDisconnects(true);
    isActivate = true;
    window.utils.adForm.reset();
    window.card.removeCard();
    window.pins.removePins();
    window.filter.deactivateFiltration();
    window.pins.defaultPins();
  };

  window.utils.mapPinMain.addEventListener('mousedown', onPopupClik);
  window.utils.mapPinMain.addEventListener('keydown', onPinEnter);

  window.page = {
    deactivatePage: deactivatePage,
  };

})();
