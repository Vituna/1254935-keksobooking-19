'use strict';

(function () {

  var DEFAULT_MAIN_PIN_X = 601;
  var DEFAULT_MAIN_PIN_Y = 404;
  var PinSize = {
    WIDTH: 65,
    HEIGHT: 65,
  };

  var map = document.querySelector('.map');
  var mapCard = map.querySelector('.map__card');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

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

    var onPinEnter = function (evt) {
      window.utils.keyEnter(evt, pinClik);
    };

    var onPinClik = function (evt) {
      window.utils.mouseClik(evt, pinClik());
    };

    pinElement.addEventListener('keydown', onPinEnter);
    pinElement.addEventListener('mousedown', onPinClik);

    return pinElement;
  };

  window.pins = {

    renderPins: function (offer) {
      var fragment = document.createDocumentFragment();
      offer.forEach(function (i) {
        fragment.appendChild(renderPin(i));
      });
      mapPins.appendChild(fragment);
    },

    defaultPins: function () {
      mapPinMain.style.top = DEFAULT_MAIN_PIN_Y - PinSize.HEIGHT / 2 + 'px';
      mapPinMain.style.left = DEFAULT_MAIN_PIN_X - PinSize.WIDTH / 2 + 'px';

    }
  };

})();
