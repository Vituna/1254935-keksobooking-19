'use strict';

(function () {

  var DEFAULT_MAIN_PIN_X = 602;
  var DEFAULT_MAIN_PIN_Y = 440;
  var PinSize = {
    WIDTH: 65,
    HEIGHT: 65,
  };

  var mapPins = document.querySelector('.map__pins');
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinItem = mapPin.cloneNode(true);
    pinItem.querySelector('img').src = pin.author.avatar;
    pinItem.style.left = pin.location.x + 'px';
    pinItem.style.top = pin.location.y + 'px';
    pinItem.querySelector('img').alt = pin.offer.title;
    var onPinItemClick = function () {
      var mapCardRemovable = window.utils.map.querySelector('.map__card');
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }
      window.card.createAd(pin);
    };
    pinItem.addEventListener('click', onPinItemClick);
    return pinItem;
  };

  var renderPins = function (pin) {
    var fragment = document.createDocumentFragment();
    pin.forEach(function (i) {
      fragment.appendChild(renderPin(i));
    });
    mapPins.appendChild(fragment);
  };

  var removePins = function () {
    var mapPinsChildren = [].slice.call(mapPins.children);
    mapPinsChildren.forEach(function (el) {
      if (el.classList.contains('map__pin') && !el.classList.contains('map__pin--main')) {
        el.remove();
      }
    });
  };

  var getMapPinMainCoords = function () {
    var mapPinMainPosition = {
      x: Math.floor(window.utils.mapPinMain.offsetLeft + window.utils.mapPinMain.offsetWidth / 2),
      y: Math.floor(window.utils.mapPinMain.offsetTop + window.utils.mapPinMain.offsetHeight - PinSize.HEIGHT / 2)
    };
    return mapPinMainPosition;
  };

  var getMapPinMainDefault = function () {
    window.utils.mapPinMain.style.top = DEFAULT_MAIN_PIN_Y - PinSize.WIDTH / 2 + 'px';
    window.utils.mapPinMain.style.left = DEFAULT_MAIN_PIN_X - PinSize.HEIGHT / 2 + 'px';
    window.form.fillAddress();
    return getMapPinMainDefault;
  };

  window.pins = {
    renderPins: renderPins,
    removePins: removePins,
    getMapPinMainCoords: getMapPinMainCoords,
    getMapPinMainDefault: getMapPinMainDefault
  };

})();
