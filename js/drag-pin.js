'use strict';
(function () {
  window.onMouseDown = function (e) { // 1. отследить нажатие
    // получаю события pin на момент нажатия мыши
    var ball = document.querySelector('.map__pin--main');
    var pinStart = getComputedStyle(ball);
    /** начальные координаты pin */
    var startLeft = pinStart.left;
    var startTop = pinStart.top;
    /** начальные координаты мыши */
    var shiftX = e.pageX;
    var shiftY = e.pageY;

    function moveAt(evt) {
      /** записываю координаты */
      /** отнять текущии координаты мыши с начальные координаты мыши */
      var resultLeft = evt.pageX - shiftX;
      var resultTop = evt.pageY - shiftY;
      /** начальные координаты мыши + с результатом расположении мыши */
      ball.style.left = parseInt(startLeft, 10) + resultLeft + 'px';
      ball.style.top = parseInt(startTop, 10) + resultTop + 'px';
    }

    // 3, перемещать по экрану
    var onMouseMove = function (ev) {
      moveAt(ev);
    };
    document.querySelector('.map__pinsoverlay').addEventListener('mousemove', onMouseMove);
    // 4. отследить окончание переноса
    var onMouseUp = function () {
      var form = document.querySelector('input[name=address]');
      /** записываю координаты в input */
      var result = ball.style.left + ',' + ball.style.top;
      var address = result;
      form.value = address;
      document.querySelector('.map__pinsoverlay').removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mouseup', onMouseUp);
  };
})();
