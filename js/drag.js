'use strict';

(function () {

  var POSITION_X = 30;
  var POSITION_Y = 40;

  var DRAG_LIMIT = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adAddress = document.querySelector('#address');


  adAddress.value = Math.floor(mapPinMain.offsetLeft - mapPinMain.offsetWidth / 2) + ', ' + Math.floor(mapPinMain.offsetTop - mapPinMain.offsetHeight / 2);

  var getMapPinMainCoords = function () {
    var mapPinMainPosition = {
      x: mapPinMain.offsetLeft + POSITION_X / 2,
      y: mapPinMain.offsetTop + POSITION_Y
    };
    return mapPinMainPosition;
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var mapPinCoords = getMapPinMainCoords();
      if (getMapPinMainCoords().y - shift.y >= DRAG_LIMIT.Y.MIN && getMapPinMainCoords().y - shift.y <= DRAG_LIMIT.Y.MAX) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
      if ((getMapPinMainCoords().x - POSITION_X / 2) - shift.x >= DRAG_LIMIT.X.MIN && (getMapPinMainCoords().x + POSITION_X / 2) - shift.x <= DRAG_LIMIT.X.MAX) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      adAddress.value = mapPinCoords.x + ', ' + mapPinCoords.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  });


})();
