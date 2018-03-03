'use strict';
(function () {
  var MAX_PINS = 5;
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  /** данные, которые мы получим с сервера */
  var rawData = [];
  /** данные после фильтрации */
  var filteredData = [];
  /** массив фильтров */
  var filters = [];
  /** секция map */
  var sectionMap = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');

  var renderMap = function (container, data) {
    /** container - куда | data - массив */
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.createPin(data[i], i));
    }
    container.appendChild(fragment);
  };

  var removeOffer = function () {
    var mapCardPopup = document.querySelector('article.map__card');
    if (mapCardPopup) {
      mapCardPopup.remove();
    }
  };

  var cleanMap = function () {
    var pins = pinsContainer.querySelectorAll('.map__pin');
    removeOffer();
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pinsContainer.removeChild(pins[i]);
      }
    }
  };
  var refreshMap = window.debounce(function () {
    cleanMap();
    filteredData = rawData;
    for (var i = 0; i < filters.length; i++) {
      filteredData = filteredData.filter(filters[i]);
    }
    filteredData = filteredData.slice(0, MAX_PINS);
    renderMap(pinsContainer, filteredData);

  }, DEBOUNCE_INTERVAL);
  /** вывожу ошибки в случие если не удалось загрузить */
  var errors = document.querySelector('.errors');
  var displayError = function (message) {
    errors.textContent = message;
  };

  var labelsHandler = function (ev) {
    /** записываю обьект по индексу из data */
    /** если есть обьект dataset то добовляюкартачку */
    var index;
    if (ev.target.classList.contains('map__pin')) {
      index = ev.target.children[0].dataset.indexPin;
    } else {
      index = ev.target.dataset.indexPin;
    }
    /** нужна такая магия, потому что если мы напишем просто if(index), то это не сработает для index === 0 */
    if (typeof index !== 'undefined') {
      /** поклюку на метку отрисоввываю предложение и удаляю */
      /** складываю элименты для отрисовки в dom */
      removeOffer();
      sectionMap.appendChild(window.createOffer(filteredData[index]));
    }
  };
  /** по клюку на метку если есть dataset  отрисовываю карточку */
  document.addEventListener('click', labelsHandler);
  document.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('popup__close')) {
      removeOffer();
    }
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.keyCode === ESC_KEYCODE) {
      removeOffer();
    }
  });

  window.map = {
    /** все экспортируемые функции собираем в один объект, чтобы не засорять пространство имён */
    loadSimilar: function () {
      window.backend.download('https://js.dump.academy/keksobooking/data/', function (data) {
        rawData = data;
        refreshMap();
      }, displayError);
    },
    unloadSimilar: function () {
      rawData = [];
      refreshMap();
    },
    applyFilters: function (newFilters) {
      filters = newFilters;
      refreshMap();
    }
  };
})();
