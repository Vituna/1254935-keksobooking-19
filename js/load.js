'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorButton = error.querySelector('.error__button');

  var successElement;
  var errorElement;

  var uploadForm = function (evt) {
    var formData = new FormData(adForm);
    window.backend.upload(formData, onUploadSuccess, onUploadErrors);
    evt.preventDefault();
  };

  var onUploadSuccess = function () {
    window.page.deactivatePage();
    adForm.reset();
    document.querySelector('main').appendChild(success);
    successElement = document.querySelector('.success');
  };

  var onUploadErrors = function () {
    document.querySelector('main').appendChild(error);
    errorElement = document.querySelector('.error');
  };

  var onRemoveElementKey = function () {
    success.remove();
    error.remove();
  };

  var onKeyClose = function (evt) {
    window.utils.keyEsc(evt, onRemoveElementKey);
    window.utils.keyEsc(evt, onRemoveElementKey);
  };

  var onButtonClick = function () {
    error.remove();
  };

  var onRemoveElementClick = function (evt) {
    if (evt.target === successElement || errorElement) {
      success.remove();
      error.remove();
    }
  };

  errorButton.addEventListener('click', onButtonClick);
  success.addEventListener('click', onRemoveElementClick);
  error.addEventListener('click', onRemoveElementClick);

  document.addEventListener('keydown', onKeyClose);
  document.addEventListener('keydown', onKeyClose);

  adForm.addEventListener('submit', uploadForm);


})();
