import {isEscapeKey, stopPropagation} from './util.js';
import {resetScale} from './pictures-scale.js';
import {resetEffects} from './pictures-effects.js';

const uploadFileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadComment = document.querySelector('.text__description');
const imgUploadHashtags = document.querySelector('.text__hashtags');
const HASHTAGS_MAX_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_MESSAGE = 'В хэштеге допущена ошибка';

const onimgUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
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

uploadFileInput.addEventListener('change', openModal);

imgUploadCancel.addEventListener('click', closeModal);
