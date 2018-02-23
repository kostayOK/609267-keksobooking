'use strict';
/** arrImgUrls масив изображения с адрисом */
var arrImgUrls = [
  'img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png',
  'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'
];
/** arrTitleSuggestion масив заголовок предложения */
var arrTitleSuggestion = [
  'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
/** тип жилище */
var typeHousing = ['flat', 'house', 'bungalo'];
var numberRandom = function (numderMin, numberMax) {
  /** число случайный от numderMin до numberMax */
  return Math.floor(Math.random() * (numberMax - numderMin)) + numderMin;
};
/** время регистрации */
var timeCheckin = ['12:00', '13:00', '14:00'];
/** время отъезда */
var timeDeparture = ['12:00', '13:00', '14:00'];
/** особености жилья */
var featuresHousing = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
/** масив фотографий */
var arrPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var generateData = function () {
  var arr = [];
  /** вызавет восемь раза и вернет заполненый массив обьектами */
  for (var i = 0; i < 8; i++) {
    var objDeclarations = {
      'author': {
        'avatar': arrImgUrls[i]
      },
      'offer': {
        'title': arrTitleSuggestion[i],
        'address': '{{location.x}}, {{location.y}}',
        'price': numberRandom(1000, 1000000),
        'type': typeHousing[numberRandom(0, 3)],
        'rooms': numberRandom(1, 5),
        'guests': numberRandom(1, 5),
        'checkin': timeCheckin[numberRandom(1, 3)],
        'checkout': timeDeparture[numberRandom(1, 3)],
        'features': featuresHousing.slice(1, numberRandom(0, featuresHousing.length - 1)),
        'description': '',
        'photos': arrPhotos
      },
      'location': {
        'x': numberRandom(300, 900),
        'y': numberRandom(150, 500)
      }
    };
    arr.push(objDeclarations);
  }
  return arr;
};
var createPin = function (obj, index) {
  /** createPin - создаем дом элимент метка */
  /** отрисовка дом элимента button и добовление фотографии */
  var buttonLocation = document.createElement('button');
  buttonLocation.className = 'map__pin';
  buttonLocation.draggable = false;
  buttonLocation.style.left = obj.location.x - 25 + 'px';
  buttonLocation.style.top = obj.location.y - 70 + 'px';
  /** создание аватарки пользователя на карте */
  var imgButton = document.createElement('img');
  imgButton.src = '';
  imgButton.style.width = '40' + 'px';
  imgButton.style.height = '40' + 'px';
  imgButton.src = obj.author.avatar;
  buttonLocation.appendChild(imgButton);
  /** создаю data атрибут чтобы по ниму вычеслять */
  /** записываю индекс по индексу в масиве */
  imgButton.dataset.indexPin = index;
  return buttonLocation;
};
/** удаление класса сказано времменое решение */
var sectionMap = document.querySelector('.map');
/** описание template ! внутринасти для размищения и замены */
var descriptionTemplate = document.querySelector('template').content.querySelector('article.map__card');
var choiceTypeHousing = function (arr) {
  /**  тип жилья */
  /** ['flat', 'house', 'bungalo'] */
  var result;
  if (arr === typeHousing[0]) {
    result = 'Квартира';
  } else if (arr === typeHousing[1]) {
    result = 'Дом';
  } else if (arr === typeHousing[2]) {
    result = 'Бунгало';
  }
  return result;
};
var renderMap = function (mapFaded, data) {
  /** mapFaded - куда | data - массив */
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i], i));
  }
  mapFaded.appendChild(fragment);
};
var createOffer = function (data) {
  var laying = descriptionTemplate.cloneNode(true);
  laying.querySelector('h3').textContent = data.offer.title;
  laying.querySelector('.popup__price').textContent = data.offer.price + '\u20bd' + '/ночь';
  laying.querySelector('h4').textContent = choiceTypeHousing(data.offer.type);
  laying.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + data.offer.checkin + ',' + ' выезд до ' + data.offer.checkout;
  /** цикл клонирует img  и выводит фото */
  var ulPopupPictures = laying.querySelector('.popup__pictures');
  for (var u = 0; u < data.offer.photos.length; u++) {
    var el = laying.querySelector('.popup__pictures').children[0].cloneNode(true);
    var elImg = el.querySelector('img');
    elImg.src = data.offer.photos[u];
    elImg.style.width = '40' + 'px';
    elImg.style.height = '40' + 'px';
    ulPopupPictures.appendChild(el);
  }
  /** удаление лишнего пустого li img */
  ulPopupPictures.removeChild(ulPopupPictures.children[0]);
  var popupFeatures = laying.querySelector('.popup__features');
  /** обход по ul его ли */
  for (var i = 0; i < popupFeatures.children.length; i++) {
    /** прячу услуги парковка и т.д */
    popupFeatures.children[i].style.display = 'none';
    var arr = data.offer.features;
    /** обход по мосиву моке */
    for (var j = 0; j < arr.length; j++) {
      var ind = popupFeatures.children[i].classList[1].replace('feature--', '');
      var elCls = arr.indexOf(ind) !== -1;
      if (elCls) {
        /** показываю услуги парковка и т.д */
        popupFeatures.children[i].style.display = 'inline-block';
      }
    }
  }
  laying.children[9].textContent = data.offer.description;
  laying.querySelector('.popup__avatar').src = data.author.avatar;
  return laying;
};
var mapFaded = document.querySelector('.map__pins');
var arrObj = generateData();
renderMap(mapFaded, arrObj);
var labelsHandler = function (ev) {
  /** поклюку на метку отрисоввываю предложение и удаляю */
  /** складываю элименты для отрисовки в dom */
  var mapCardPopup = sectionMap.querySelector('article.map__card');
  if (mapCardPopup) {
    sectionMap.removeChild(mapCardPopup);
  }
  /** записываю обьект по индексу из data */
  /** если есть обьект dataset то добовляю окно инфы */
  var index;
  if (ev.target.classList.contains('map__pin')) {
    index = ev.target.children[0].dataset.indexPin;
  } else {
    index = ev.target.dataset.indexPin;
  }
  /** нужна такая магия, потому что если мы напишем просто if(index), то это не сработает для index === 0 */
  if (typeof index !== 'undefined') {

    sectionMap.appendChild(createOffer(arrObj[index]));
  }
};
/** по клюку на метку отрисовываю все метки */
document.addEventListener('click', labelsHandler);
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
  /** добовляю  формы disabled или убераю */
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
  address.disabled = true;
});
inputNavigator(mapPinMap);
/** notice__form notice__form--disabled */
/** после нажатия переходим в неоктивный режим */
var formReset = noticesForm.querySelector('.form__reset');
formReset.addEventListener('mouseup', function () {
  /** пререзагрузил страницу */
  location.reload();
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
