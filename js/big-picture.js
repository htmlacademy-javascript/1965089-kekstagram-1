import {isEscapeKey} from './util.js';
import {pictures} from './pictures.js';

const bigPicture = document.querySelector('.big-picture');
const smallPictureContainer = document.querySelector('.pictures');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const openBigPicture = (pictureArrayElement) => {
  document.querySelector('.big-picture__img').children[0].src = pictureArrayElement.url;
  document.querySelector('.likes-count').textContent = pictureArrayElement.likes;
  document.querySelector('.comments-count').textContent = pictureArrayElement.comments.length;
  document.querySelector('.social__caption').textContent = pictureArrayElement.description;

  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  for (const com in pictureArrayElement.comments) {
    const newComment = socialComment.cloneNode(true);
    socialComments.appendChild(newComment);
    const actualComment = pictureArrayElement.comments[com];
    newComment.querySelector('.social__text').textContent = actualComment.message;
    newComment.querySelector('.social__picture').src = actualComment.avatar;
    newComment.querySelector('.social__picture').alt = actualComment.name;
  }
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onBigPictureEscKeydown);

  document.body.classList.remove('modal-open');
};

const findElementDataset = (evt) => {
  const picture = evt.target.closest('[data-id]');

  if (picture) {
    const pictureArrayElement = pictures.find(
      (item) => item.id === +picture.dataset.id
    );

    openBigPicture(pictureArrayElement);
  }
};

smallPictureContainer.addEventListener('click', (evt) => {
  findElementDataset(evt);
});

bigPictureCloseButton.addEventListener('click', closeBigPicture);
