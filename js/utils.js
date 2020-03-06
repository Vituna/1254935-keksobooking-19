'use strict';

(function () {

  var MOUSE_LEFT_BUTTON = 0;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.utils = {

    map: document.querySelector('.map'),
    mapPinMain: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form'),

    mouseClick: function (evt, cd) {
      if (evt.button === MOUSE_LEFT_BUTTON) {
        cd();
      }
    },

    keyEsc: function (evt, cd) {
      if (evt.key === ESC_KEY) {
        cd();
      }
    },

    keyEnter: function (evt, cd) {
      if (evt.key === ENTER_KEY) {
        cd();
      }
    },
  };

})();
