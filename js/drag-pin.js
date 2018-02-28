'use strict';
(function () {
  window.onMouseDown = function (e) { // 1. отследить нажатие
    function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();
      return {

        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        address: (box.x - (box.width / 2)) + ',' + (box.y - (box.height / 2))
      };
    }
    var ball = document.querySelector('.map__pin--main');
    // подготовить к перемещению
    // 2. разместить на том же месте, но в абсолютных координатах
    // moveAt(e);
    var coords = getCoords(ball);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;
    // переместим в body, чтобы мяч был точно не внутри position:relative
    /** записываю координаты */
    ball.style.position = 'absolute';
    ball.style.cursor = 'pointer';
    document.body.appendChild(ball);
    moveAt(e);
    ball.style.zIndex = 1000; // показывать мяч над другими элементами
    // передвинуть мяч под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(evt) {
      ball.style.left = evt.pageX - shiftX + 'px';
      ball.style.top = evt.pageY - shiftY + 'px';
    }
    // 3, перемещать по экрану
    var onMouseMove = function (ev) {
      moveAt(ev);
    };
    document.querySelector('.map__pinsoverlay').addEventListener('mousemove', onMouseMove);
    // 4. отследить окончание переноса
    var onMouseUp = function (evt) {
      evt.preventDefault();
      var form = document.querySelector('input[name=address]');
      var address = coords.address;
      form.value = address;
      document.querySelector('.map__pinsoverlay').removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mouseup', onMouseUp);
  };
})();
