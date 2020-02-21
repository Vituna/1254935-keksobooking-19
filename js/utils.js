'use strict';

(function () {
  var MOUSE_LEFT_BUTTON = 0;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';


  window.utils = {
    mouseClik: function (evt) {
      return evt.button === MOUSE_LEFT_BUTTON;
    },

    keyEsc: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action.remove();
      }
    },

    keyEnter: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }

    },

    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    getRandomArrElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },


  };

})();
