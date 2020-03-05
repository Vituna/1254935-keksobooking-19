'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var adPhotoFileChooser = document.querySelector('.ad-form__upload');
  var wasteDiv = document.querySelector('.ad-form__photo');

  var setFileSelectHandler = function (evt, preview) {
    var fileChooser = evt.currentTarget;
    var files = Array.from(evt.target.files);
    files.forEach(function (file, i) {
      var currentIndex = i;
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (fileChooser === adPhotoFileChooser) {
            if (currentIndex === 0) {
              wasteDiv.remove();
            }
            addNewAdPhotoDiv(createNewAdPhoto(fileName, reader.result));
          } else {
            preview.src = reader.result;
          }
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var createNewAdPhoto = function (fileName, link) {
    var newPhotoDiv = createNewDiv();
    var img = document.createElement('img');
    img.src = link;
    img.title = fileName;
    img.width = 70;
    img.height = 70;
    newPhotoDiv.appendChild(img);
    return newPhotoDiv;
  };

  var addNewAdPhotoDiv = function (div) {
    adFormPhotoContainer.insertBefore(div, adFormPhotoContainer.lastChild);
  };

  var createNewDiv = function () {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    return div;
  };

  var resetForm = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
    resetAdPhotoContainer();
  };

  var resetAdPhotoContainer = function () {
    adFormPhotoContainer.innerHTML = '';
    adFormPhotoContainer.appendChild(adPhotoFileChooser);
    wasteDiv = createNewDiv();
    addNewAdPhotoDiv(wasteDiv);
  };

  var returnsAvatar = function (evt) {
    setFileSelectHandler(evt, avatarPreview);
  };

  adPhotoFileChooser.addEventListener('change', setFileSelectHandler);
  avatarFileChooser.addEventListener('change', returnsAvatar);

  window.image = {
    resetForm: resetForm,
  };

})();
