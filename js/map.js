'use strict';
var arrayDeclarations = [];
/** arrImgUrl масив изображения с адрисом */
var arrImgUrl = [
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
var generateData = function (arr) {
  /** вызавет восемь раза и вернет заполненый массив обьектами */
  for (var i = 0; i < 8; i++) {
    var objDeclarations = {
      'author': {
        'avatar': arrImgUrl[i]
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
        'features': featuresHousing,
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
/** отрисовка дом элимента button */
var buttonLocation = document.createElement('button');
buttonLocation.className = 'map__pin';
buttonLocation.style.height = '40' + 'px';
buttonLocation.style.width = '40' + 'px';
buttonLocation.draggable = false;
/** создание аватарки пользователя на карте */
var imgButton = document.createElement('img');
imgButton.src = '';
imgButton.style.width = '40' + 'px';
imgButton.style.height = '40' + 'px';
buttonLocation.appendChild(imgButton);
var mapFaded = document.querySelector('.map__pins');
mapFaded.appendChild(buttonLocation);
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
/** массив с обьектами */
var arrObj = generateData(arrayDeclarations);
var popupPictures = descriptionTemplate.querySelector('.popup__pictures li');
var fragmentPhoto = document.createDocumentFragment();
var laying2 = document.querySelector('template').content.querySelector('article.map__card .popup__pictures');
/** клонирование добавление li img style */
for (var p = 0; p < arrPhotos.length; p++) {
  var el = popupPictures.cloneNode(true);
  el.querySelector('li img').src = arrObj[p].offer.photos[p];
  el.querySelector('li img').style.width = '40' + 'px';
  el.querySelector('img').style.height = '40' + 'px';
  fragmentPhoto.appendChild(el);
}
laying2.appendChild(fragmentPhoto);
/** создание и удаление лишнего пустого li img */
var ulPopupPictures = descriptionTemplate.querySelector('.popup__pictures');
ulPopupPictures.removeChild(ulPopupPictures.children[0]);

var fragment = document.createDocumentFragment();
for (var i = 0; i < arrObj.length; i++) {
  var laying = descriptionTemplate.cloneNode(true);

  laying.querySelector('h3').textContent = arrObj[i].offer.title;
  buttonLocation.style.left = arrObj[i].location.x - 20 + 'px';
  buttonLocation.style.top = arrObj[i].location.y - 40 + 'px';
  imgButton.src = arrObj[i].author.avatar;
  laying.querySelector('.popup__price').textContent = arrObj[i].offer.price + '\u20bd' + '/ночь';
  laying.querySelector('h4').textContent = choiceTypeHousing(arrObj[i].offer.type);
  laying.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + arrObj[i].offer.checkin + ',' + ' выезд до ' + arrObj[i].offer.checkout;
  laying.children[9].textContent = arrObj[i].offer.description;
  laying.querySelector('.popup__avatar').src = arrObj[i].author.avatar;
  fragment.appendChild(laying);
}
sectionMap.appendChild(fragment);
