'use strict';

(function () {
  var PINS_LIMIT = 5;
  var DEBOUNCE_INTERVAL = 500;

  var PriceRange = {
    Low: {
      MIN: 0,
      MAX: 10000
    },
    Middle: {
      MIN: 10000,
      MAX: 50000
    },
    High: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
  var featuresFieldset = document.querySelector('#housing-features');
  var data = [];
  var filteredData = [];

  var filtrationItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  var filtrationByType = function (item) {
    return filtrationItem(typeSelect, item.offer, 'type');
  };

  var filtrationByPrice = function (item) {
    var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  var filtrationByRooms = function (item) {
    return filtrationItem(roomsSelect, item.offer, 'rooms');
  };

  var filtrationByGuests = function (item) {
    return filtrationItem(guestsSelect, item.offer, 'guests');
  };

  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var debounce = function (fun) {
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
  };

  var onFilterChange = debounce(function () {
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filtrationByType);
    filteredData = filteredData.filter(filtrationByPrice);
    filteredData = filteredData.filter(filtrationByRooms);
    filteredData = filteredData.filter(filtrationByGuests);
    filteredData = filteredData.filter(filtrationByFeatures);
    window.pins.removePins();
    window.card.removeCard();
    window.pins.renderPins(filteredData.slice(0, PINS_LIMIT));
  });

  var resetFilter = function () {
    filterItems.forEach(function (it) {
      it.value = 'any';
    });
    var featuresItems = featuresFieldset.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var activateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    onFilterChange();
    filter.addEventListener('change', onFilterChange);
  };

  var deactivateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  };

  var activateFiltration = function (adData) {
    data = adData.slice(0);
    activateFilter();
    return adData.slice(0, PINS_LIMIT);
  };

  var deactivateFiltration = function () {
    deactivateFilter();
    filter.reset();
  };

  window.filter = {
    activateFiltration: activateFiltration,
    deactivateFiltration: deactivateFiltration
  };

})();
