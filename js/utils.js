'use strict';

(function () {
  var MOUSE_LEFT_BUTTON = 0;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var DEBOUNCE_INTERVAL = 300;


  window.utils = {
    mouseClik: function (evt) {
      return evt.button === MOUSE_LEFT_BUTTON;
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

    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    getRandomArrElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    debounce: function (fun) {
      var lastTimeout = null;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, DEBOUNCE_INTERVAL);
      };
    },
  };

})();
