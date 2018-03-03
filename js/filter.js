'use strict';
(function () {
  var filters = [null, null, null, null, null];

  function notNull(element) {
    return element !== null;
  }

  function refresh() {
    window.map.applyFilters(filters.filter(notNull));
  }

  var typeSelector = document.querySelector('#housing-type');
  typeSelector.addEventListener('change', function (e) {
    var value = e.target.value;
    var filter = null;
    if (value !== 'any') {
      filter = function (element) {
        return element.offer.type === value;
      };
    }
    filters[0] = filter;
    refresh();
  });

  var priceSelector = document.querySelector('#housing-price');
  priceSelector.addEventListener('change', function (e) {
    var value = e.target.value;
    var filter = null;
    if (value !== 'any') {
      var min = 0;
      var max = 1000000;
      if (value === 'low') {
        max = 10000;
      } else if (value === 'middle') {
        min = 10000;
        max = 50000;
      } else if (value === 'high') {
        min = 50000;
      }
      filter = function (element) {
        var price = element.offer.price;
        return (price > min) && (price <= max);
      };
    }
    filters[1] = filter;
    refresh();
  });

  var roomsSelector = document.querySelector('#housing-rooms');
  roomsSelector.addEventListener('change', function (e) {
    var value = e.target.value;
    var filter = null;
    if (value !== 'any') {
      filter = function (element) {
        return element.offer.rooms === +value;
      };
    }
    filters[2] = filter;
    refresh();
  });

  var guestsSelector = document.querySelector('#housing-guests');
  guestsSelector.addEventListener('change', function (e) {
    var value = e.target.value;
    var filter = null;
    if (value !== 'any') {
      filter = function (element) {
        return element.offer.guests === +value;
      };
    }
    filters[3] = filter;
    refresh();
  });

  var featuresSelector = document.querySelector('#housing-features');
  featuresSelector.addEventListener('change', function () {
    var checkboxes = featuresSelector.querySelectorAll('input');
    var features = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        features.push(checkboxes[i].value);
      }
    }
    var filter = null;
    if (features.length) {
      filter = function (element) {
        var hasAllFeatures = true;
        for (var j = 0; j < features.length; j++) {
          if (element.offer.features.indexOf(features[j]) === -1) {
            hasAllFeatures = false;
          }
        }
        return hasAllFeatures;
      };
    }
    filters[4] = filter;
    refresh();
  });
})();
