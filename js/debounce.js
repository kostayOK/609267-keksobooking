'use strict';
(function () {
  window.debounce = function (cb, interval) {
    var timeout;
    var lastTimeCalled = 0;
    return function () {
      if (Date.now() - lastTimeCalled < interval) {
        clearTimeout(timeout);
      }
      lastTimeCalled = Date.now();
      timeout = setTimeout(cb, interval);
    };
  };
})();
