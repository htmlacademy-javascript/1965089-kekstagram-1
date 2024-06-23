import {isEscapeKey} from './util.js';
import {pictures} from './pictures.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const smallPictureContainer = document.querySelector('.pictures');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const bigPictureImg = document.querySelector('.big-picture__img img');

let commentsShown = 0;
let allComments = [];

const renderPhotoDetails = ({url, description, likes}) => {
  bigPictureImg.src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const createComment = (comment) => {
  const elementComment = socialComment.cloneNode(true);
  elementComment.querySelector('.social__picture').src = comment.avatar;
  elementComment.querySelector('.social__picture').alt = comment.name;
  elementComment.querySelector('.social__text').textContent = comment.message;

  return elementComment;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0 ; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  socialComments.innerHTML = '';
  socialComments.append(fragment);
  socialCommentCount.innerHTML = `${commentsShown } из <span class="comment-count">${comments.length}</span> коментариев`;
};

const getCommentsCount = (comments) => {
  commentsShown += COMMENTS_STEP;
  if(commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  renderComments(comments);
};

commentsLoader.addEventListener('click', () => {
  getCommentsCount(allComments);
});

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsShown = 0;
  }
};

const openBigPicture = (pictureArrayElement) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  allComments = pictureArrayElement.comments;
  getCommentsCount(pictureArrayElement.comments);
  renderPhotoDetails(pictureArrayElement);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  document.body.classList.remove('modal-open');
  commentsShown = 0;
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
