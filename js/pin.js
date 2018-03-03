'use strict';
(function () {
  window.createPin = function (obj, index) {
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
})();
