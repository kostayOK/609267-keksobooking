'use strict';
(function () {
  window.choiceTypeHousing = function (arr) {
    /**  тип жилья */
    /** ['flat', 'house', 'bungalo'] */
    var result;
    switch (arr) {
      case 'flat':
        result = 'Квартира';
        break;
      case 'house':
        result = 'Дом';
        break;
      case 'bungalo':
        result = 'Бунгало';
        break;
    }
    return result;
  };
})();
