import {isEscapeKey, stopPropagation} from './util.js';
import {resetScale} from './pictures-scale.js';
import {resetEffects} from './pictures-effects.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const HASHTAGS_MAX_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_MESSAGE = 'В хэштеге допущена ошибка';

const body = document.querySelector('body');
const uploadFileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadComment = document.querySelector('.text__description');
const imgUploadHashtags = document.querySelector('.text__hashtags');
const successElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = document.querySelector('#success').content.querySelector('.success__button');
const errorElement = document.querySelector('#error').content.querySelector('.error');
const errorButtonElement = document.querySelector('#error').content.querySelector('.error__button');
const submitButton = document.querySelector('.img-upload__submit');
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const onimgUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !body.classList.contains('open-error')) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFileInput.value = '';
    resetScale();
    resetEffects();
    imgUploadForm.reset();
  }
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onimgUploadEscKeydown);
  imgUploadHashtags.addEventListener('keydown', stopPropagation);
  imgUploadComment.addEventListener('keydown', stopPropagation);
  resetScale();
};

const closeModal = () => {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onimgUploadEscKeydown);
  document.body.classList.remove('modal-open');
  imgUploadHashtags.removeEventListener('keydown', stopPropagation);
  imgUploadComment.removeEventListener('keydown', stopPropagation);
  imgUploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= HASHTAGS_MAX_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = () => {
  const tags = imgUploadHashtags.value.trim().split(' ').filter((tag) => tag.trim().length);

  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  imgUploadHashtags,
  validateTags,
  HASHTAG_ERROR_MESSAGE
);

const showSuccessMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(successElement);
    } else {
      const successElementClone = document.querySelector('.success');
      successElementClone.classList.remove('hidden');
    }
  };
};
const showFullSuccessMessage = showSuccessMessage();

const showErrorMessage = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(errorElement);
    } else {
      const errorElementClone = document.querySelector('.error');
      errorElementClone.classList.remove('hidden');
    }
    body.classList.add('open-error');
  };
};
const showFullErrorMessage = showErrorMessage();

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const hideModalMessage = () => {
  successElement.classList.add('hidden');
  errorElement.classList.add('hidden');
  body.classList.remove('open-error');
};

const onBodyClick = (evt) => {
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
    document.removeEventListener('click', onBodyClick);
  }
};

const onCloseButtonClick = () => {
  hideModalMessage();
};

const onEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    hideModalMessage();
    document.removeEventListener('keydown', onEscPress);
  }
};

const onFormSubmit = (cb) => {
  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      successButtonElement.addEventListener('click', onCloseButtonClick);
      errorButtonElement.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onEscPress);
      document.addEventListener('click', onBodyClick);
      await cb(new FormData(imgUploadForm));
      unblockSubmitButton();
    }
  });
};

const setPreviewPictureListener = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

uploadFileInput.addEventListener('change', openModal);

imgUploadCancel.addEventListener('click', closeModal);

export {closeModal, onFormSubmit, showFullSuccessMessage, showFullErrorMessage, setPreviewPictureListener};
