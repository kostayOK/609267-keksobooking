'use strict';
(function () {
  var renderMap = function (mapFaded, data) {
    /** mapFaded - куда | data - массив */
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.createPin(data[i], i));
    }
    mapFaded.appendChild(fragment);
  };
  /** секция map */
  var sectionMap = document.querySelector('.map');
  var mapFaded = document.querySelector('.map__pins');
  /** вывожу ошибки в случие если не удалось загрузить */
  var errors = document.querySelector('.errors');
  var onEror = function (message) {
    errors.textContent = message;
  };
  var onSuccess = function (data) {
    renderMap(mapFaded, data);
    window.setPinsDisplay('none');
  };
  window.backend.download('https://js.dump.academy/keksobooking/data/', onSuccess, onEror);
  var labelsHandler = function (ev) {
    /** поклюку на метку отрисоввываю предложение и удаляю */
    /** складываю элименты для отрисовки в dom */
    var mapCardPopup = document.querySelector('article.map__card');
    if (mapCardPopup) {
      mapCardPopup.remove();
    }
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
      window.backend.download('https://js.dump.academy/keksobooking/data/', function (data) {
        sectionMap.appendChild(window.createOffer(data[index]));
      }, onEror);

    }
  };
  /** по клюку на метку если есть dataset  отрисовываю карточку */
  document.addEventListener('click', labelsHandler);
})();
