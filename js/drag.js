'use strict';

(function () {

  var DragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var drag = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var Border = {
      TOP: DragLimit.Y.MIN - window.utils.mapPinMain.offsetHeight,
      BOTTOM: DragLimit.Y.MAX - window.utils.mapPinMain.offsetHeight,
      LEFT: DragLimit.X.MIN,
      RIGHT: DragLimit.X.MAX - window.utils.mapPinMain.offsetWidth
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

      var mapPinMainPosition = {
        x: window.utils.mapPinMain.offsetLeft - shift.x,
        y: window.utils.mapPinMain.offsetTop - shift.y
      };

      if (mapPinMainPosition.x >= Border.LEFT && mapPinMainPosition.x <= Border.RIGHT) {
        window.utils.mapPinMain.style.left = mapPinMainPosition.x + 'px';
      }

      if (mapPinMainPosition.y >= Border.TOP && mapPinMainPosition.y <= Border.BOTTOM) {
        window.utils.mapPinMain.style.top = mapPinMainPosition.y + 'px';
      }

      window.address.fillAddress();

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.utils.map.removeEventListener('mousemove', onMouseMove);
      window.utils.map.removeEventListener('mouseup', onMouseUp);
    };

    window.utils.map.addEventListener('mousemove', onMouseMove);
    window.utils.map.addEventListener('mouseup', onMouseUp);
  };

  window.utils.mapPinMain.addEventListener('mousedown', drag);


})();
