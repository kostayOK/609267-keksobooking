'use strict';
(function () {
  var sectionMap = document.querySelector('.map');
  var mapFaded = document.querySelector('.map__pins');
  var setPinsDisplay = function (display) {
    /** прячу все элименты ! метки и табличку с описаниями */
    /** setPinsDisplay - отрисовка метки */
    for (var i = 0; i < mapFaded.children.length; i++) {
      if (mapFaded.children[i].classList.contains('map__pin')) {
        mapFaded.children[i].style.display = display;
      }
      if (mapFaded.children[i].classList.contains('map__pin--main')) {
        mapFaded.children[i].style.display = 'inline-block';
      }
    }
  };
  /** отключение полей формы .notice__form */
  var noticesForm = document.querySelector('.notice__form');
  var setFormsDisabled = function (flag) {
    /** добовляю в поля формы disabled */
    for (var i = 0; i < noticesForm.length; i++) {
      noticesForm[i].disabled = flag;
    }
  };
  /** обертка запускаю при закрузки document*/
  var formsDisabledHandler = function () {
    setFormsDisabled(true);
    setPinsDisplay('none');
  };
  /** для перетаскивание элимента */
  var mapPinMap = document.querySelector('.map__pin--main');
  /** input для записи адреса */
  var inputAddress = noticesForm.querySelector('#address');
  /** обьект с координатами */
  var rect = mapPinMap.getBoundingClientRect();
  var inputNavigator = function () {
    /** запись адриса при заблокированой форме */
    inputAddress.value = (rect.x - (rect.width / 2)) + ',' + (rect.y - (rect.height / 2));
  };
  inputNavigator();
  document.addEventListener('DOMContentLoaded', formsDisabledHandler);
  mapPinMap.addEventListener('mouseup', function () {
    /** появление метоки на карте */
    sectionMap.classList.remove('map--faded');
    /** отменяет disabled */
    noticesForm.classList.remove('notice__form--disabled');
    setFormsDisabled(false);
    /** запись адриса */
    setPinsDisplay('inline-block');
    var formReset = noticesForm.querySelector('.form__reset');
    /** перезагрузил страницу при очистке формы */
    formReset.addEventListener('mouseup', function () {
      location.reload();
    });
  });
})();
