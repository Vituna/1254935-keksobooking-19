'use strict';

(function () {
  var UPLOAD = 'https://js.dump.academy/keksobooking';
  var LOAD = 'https://js.dump.academy/keksobooking/data';

  var setup = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    return xhr;
  };

  window.backend = {
    upload: function (data, onLoad) {
      var xhr = setup(onLoad);
      xhr.open('POST', UPLOAD);
      xhr.send(data);
    },

    load: function (onLoad) {
      var xhr = setup(onLoad);
      xhr.open('GET', LOAD);
      xhr.send();
    }
  };

})();
