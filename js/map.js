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
// var featuresHousingRandom = featuresHousing.splice(0, numberRandom(0, featuresHousing.length));

// console.log(featuresHousing.splice(0, numberRandom(0, featuresHousing.length)));
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
        'features': featuresHousing.splice(0, numberRandom(0, featuresHousing.length)),
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
var createPin = function (obj) {
  /** createPin - создаем дом элимент метка */
  /** отрисовка дом элимента button и добовление фотографии */
  var buttonLocation = document.createElement('button');
  buttonLocation.className = 'map__pin';
  buttonLocation.style.height = '40' + 'px';
  buttonLocation.style.width = '40' + 'px';
  buttonLocation.draggable = false;
  buttonLocation.style.left = obj.location.x - 20 + 'px';
  buttonLocation.style.top = obj.location.y - 40 + 'px';
  /** создание аватарки пользователя на карте */
  var imgButton = document.createElement('img');
  imgButton.src = '';
  imgButton.style.width = '40' + 'px';
  imgButton.style.height = '40' + 'px';
  imgButton.src = obj.author.avatar;
  buttonLocation.appendChild(imgButton);
  return buttonLocation;
};
/** удаление класса сказано времменое решение */
var sectionMap = document.querySelector('.map');
sectionMap.classList.remove('map--faded');
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
    fragment.appendChild(createPin(data[i]));
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
    popupFeatures.children[i].style.display = 'none';
    var arr = data.offer.features;
    /** обход по мосиву моке */
    for (var j = 0; j < arr.length; j++) {
      var ind = popupFeatures.children[i].classList[1].replace('feature--', '');
      var elCls = arr.indexOf(ind) !== -1;
      if (elCls) {
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
var offer = createOffer(arrObj[2]);
sectionMap.appendChild(offer);
