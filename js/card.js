'use strict';
(function () {
  /** описание template ! внутринасти для размищения и замены */
  var descriptionTemplate = document.querySelector('template').content.querySelector('article.map__card');
  window.createOffer = function (data) {
    var laying = descriptionTemplate.cloneNode(true);
    laying.querySelector('h3').textContent = data.offer.title;
    laying.querySelector('.popup__price').textContent = data.offer.price + '\u20bd' + '/ночь';
    laying.querySelector('h4').textContent = window.data.choiceTypeHousing(data.offer.type);
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
})();
