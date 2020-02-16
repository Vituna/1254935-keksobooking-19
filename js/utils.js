'use strict';

window.utils = (function () {
  var MOUSE_LEFT_BUTTON = 0;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';


  return {
    mouseClik: function (evt) {
      return evt.button === MOUSE_LEFT_BUTTON;
    },

    keyEsc: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action.remove();
      }
    },

    keyEnter: function (evt) {
      return evt.key === ENTER_KEY;
    },

    keyEnterPin: function (evt, action) {
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
