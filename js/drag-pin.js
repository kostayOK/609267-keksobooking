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
    var mapPins = document.querySelector('.map__pins');

    function onMouseMove(evt) {
      /** записываю координаты 3, перемещать по экрану */
      /** отнять текущии координаты мыши с начальные координаты мыши */
      var resultLeft = evt.pageX - shiftX;
      var resultTop = evt.pageY - shiftY;
      /** начальные координаты мыши + с результатом расположении мыши */
      ball.style.left = parseInt(startLeft, 10) + resultLeft + 'px';
      ball.style.top = parseInt(startTop, 10) + resultTop + 'px';
    }
    mapPins.addEventListener('mousemove', onMouseMove);
    // 4. отследить окончание переноса
    var onMouseUp = function () {
      var form = document.querySelector('input[name=address]');
      /** записываю координаты в input */
      var result = parseInt(ball.style.left, 10) + ',' + parseInt(ball.style.top, 10);
      var address = result;
      form.value = address;
      mapPins.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mouseup', onMouseUp);
  };
})();
