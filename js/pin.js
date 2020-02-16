'use strict';

(function () {
  var QUANTITY = 7;


  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');

  window.renderPosts = {
    renderPosts: function () {
      return new Array(QUANTITY).fill('').map(window.card.getOffer);
    },

    renderPin: function (pin) {
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

      var mouseClikPin = function (evt) {
        window.utils.mouseClik(evt, pinClik());
      };

      var keyEnterPress = function (evt) {
        window.utils.keyEnterPin(evt, pinClik);
      };

      pinElement.addEventListener('keydown', keyEnterPress);
      pinElement.addEventListener('mousedown', mouseClikPin);

      return pinElement;
    },

    createPins: function (offer) {
      var fragment = document.createDocumentFragment();

      offer.forEach(function (i) {
        fragment.appendChild(window.renderPosts.renderPin(i));
      });

      mapPins.appendChild(fragment);
    }
  };

  window.removePi = {
    removePins: function () {
      var mapPinsChildren = [].slice.call(mapPins.children);
      mapPinsChildren.forEach(function (el) {
        if (el.classList.contains('map__pin') && !el.classList.contains('map__pin--main')) {
          el.remove();
        }
      });
    }
  };

  var mouseClikOpenPopup = function (evt) {
    window.utils.mouseClik(evt, window.form.activationForm());
  };

  var keyOpenActivation = function (evt) {
    window.utils.keyEnter(evt, window.form.activationForm());
  };


  mapPinMain.addEventListener('mousedown', mouseClikOpenPopup);
  mapPinMain.addEventListener('keydown', keyOpenActivation);


})();
