'use strict';

(function () {
  var QUANTITY = 4;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');

  var renderPin = function (pin) {
    var pinElement = mapPin.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';

    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;

    var pinClik = function () {
      if (mapCard) {
        mapCard.remove();
      }
      window.card.createAd(pin);
    };

    var keyEnterPin = function (evt) {
      window.utils.keyEnter(evt, pinClik);
    };

    var mouseClikPin = function (evt) {
      window.utils.mouseClik(evt, pinClik());
    };

    pinElement.addEventListener('keydown', keyEnterPin);
    pinElement.addEventListener('mousedown', mouseClikPin);

    return pinElement;
  };

  window.pins = {
    createPins: function () {
      return new Array(QUANTITY).fill('').map(window.data.getOffer);
    },

    renderPosts: function (offer) {
      var fragment = document.createDocumentFragment();

      offer.forEach(function (i) {
        fragment.appendChild(renderPin(i));
      });

      mapPins.appendChild(fragment);
    },
  };

})();
