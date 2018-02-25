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
    /** добовляю в поля формы disabled */
    var address = noticesForm.querySelector('input[name=address]');
    address.readOnly = true;
    var formReset = noticesForm.querySelector('.form__reset');
    /** перезагрузил страницу при очистке формы */
    formReset.addEventListener('mouseup', function () {
      location.reload();
    });
  });

  var price = noticesForm.querySelector('#price');
  var typeSelect = noticesForm.querySelector('#type');
  var controlHandler = function () {
    /** добовляю тип жилья и цена должна соответствовать */
    var value = typeSelect.value;
    switch (value) {
      case 'flat':
        price.min = 1000;
        break;
      case 'bungalo':
        price.min = 0;
        break;
      case 'house':
        price.min = 5000;
        break;
      case 'palace':
        price.min = 10000;
        break;
    }
  };
  /** происходит по окончании изменения значения элемента формы тип жилья цена за ночь */
  typeSelect.addEventListener('change', controlHandler);
  price.addEventListener('change', controlHandler);
  var timein = noticesForm.querySelector('#timein');
  var timeout = noticesForm.querySelector('#timeout');
  var timeInOunHendler = function (selectStart, selectEnd) {
    /** выстовляю значение время заезда и выезда */
    for (var i = 0; i < selectStart.children.length; i++) {
      if (selectStart.children[i].selected) {
        selectEnd.children[i].selected = true;
      }
    }
  };
  timein.addEventListener('change', function () {
    /** выстовляю значение время заезда и выезда */
    timeInOunHendler(timein, timeout);
  });

  timeout.addEventListener('change', function () {
    /** выстовляю значение время заезда и выезда */
    timeInOunHendler(timeout, timein);
  });
  /** размищение гостей */
  var roomNumber = noticesForm.querySelector('#room_number');
  var capacity = noticesForm.querySelector('#capacity');
  var roomNumberCapacity = function () {
    /** окончания вычисления сколько комнат ! разрешить кол-во жилцов */
    var value = roomNumber.value;
    var capacityChildren = capacity.children;
    for (var i = 0; i < capacityChildren.length; i++) {
      /** disabled по умолчанию сначало у всех стоит true */
      capacityChildren[i].disabled = true;
    }
    var THRE_PERSON = 0;
    var TWO_PERSON = 1;
    var ONE_PERSON = 2;
    var NOT_PERSON = 3;
    capacityChildren[ONE_PERSON].selected = true;
    switch (value) {
      case '1':
        capacityChildren[ONE_PERSON].disabled = false;
        break;
      case '2':
        capacityChildren[TWO_PERSON].disabled = false;
        capacityChildren[ONE_PERSON].disabled = false;
        break;
      case '3':
        capacityChildren[THRE_PERSON].disabled = false;
        capacityChildren[TWO_PERSON].disabled = false;
        capacityChildren[ONE_PERSON].disabled = false;
        break;
      case '100':
        capacityChildren[NOT_PERSON].disabled = false;
        capacityChildren[NOT_PERSON].selected = true;
        break;
    }


  };
  roomNumber.addEventListener('change', roomNumberCapacity);
  document.addEventListener('DOMContentLoaded', roomNumberCapacity);
})();
