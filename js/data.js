'use strict';
(function () {
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

  var numberRandom = function (numderMin, numberMax) {
    /** число случайный от numderMin до numberMax */
    return Math.floor(Math.random() * (numberMax - numderMin)) + numderMin;
  };

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
  window.data = {
    choiceTypeHousing: choiceTypeHousing,
    generateData: generateData
  };
})();
// console.log(window.data.generateData())


