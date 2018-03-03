'use strict';
(function () {
  // var onEror = function (message) {
  //   console.error(message);
  // };
  // var onSuccess = function (data) {
  //   console.error(data);
  // };
  var download = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        /** успешный запрос */
        onLoad(xhr.response);
      } else {
        onError('статус ошибки ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('запрос не успел выполнится ' + xhr.timeout + ' мс');
    });
    xhr.timeout = 10000;
    /** какой апрос и адрес запроса */
    xhr.open('GET', url);
    /** отправить на сервер */
    xhr.send();
  };
  var upload = function (url, data, onLoad, onError) { // , onLoad, onError
    var formData = new FormData(data);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        /** успешный запрос */
        onLoad(xhr.response);
      } else if (xhr.status >= 400) {
        onError('статус ошибки ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('запрос не успел выполнится ' + xhr.timeout + ' мс');
    });
    xhr.timeout = 10000;
    xhr.open('POST', url);
    xhr.send(formData);
  };
  window.backend = {
    download: download,
    upload: upload
  };
})();
